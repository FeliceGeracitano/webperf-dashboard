import * as chromeLauncher from 'chrome-launcher';
import * as fs from 'fs-extra';
import * as lighthouse from 'lighthouse';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import * as path from 'path';
import { path as Rpath, pipe } from 'ramda';
import db from './influxdb';
import Logger from './logger';
import {
  IAudits,
  ICategories,
  ICronConfig,
  IDBPayload,
  ILighthouseAuditReport,
  ILighthouseRespose
} from './types';

const console = new Logger('[Audit tools]: ');

const getMaxDOMDepthCount = pipe(
  Rpath(['audits', 'dom-size', 'details', 'items', 1, 'value']),
  parseFloat
);
const getMaxChildElementsCount = pipe(
  Rpath(['audits', 'dom-size', 'details', 'items', 2, 'value']),
  parseFloat
);

const launchChromeAndRunLighthouse = async (url, config): Promise<ILighthouseRespose> => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-zygote', '--no-sandbox']
  });
  const flags = { port: chrome.port, output: 'json' };
  const result = await lighthouse(url, flags, config);
  await chrome.kill();
  return result.lhr;
};

const filterResults = (data: ILighthouseRespose): IDBPayload => {
  const { categories, audits } = data;
  const report = {} as IDBPayload;
  // Main Categories
  for (let categoryKey in ICategories) {
    if (!Object.prototype.hasOwnProperty.call(categories, categoryKey)) continue;
    report[`${categoryKey}-score`] = categories[categoryKey].score;
  }
  // performance audits
  for (let auditKey in IAudits) {
    if (!Object.prototype.hasOwnProperty.call(audits, auditKey)) continue;
    const { rawValue, score } = audits[auditKey];
    rawValue !== undefined && (report[auditKey] = rawValue);
    score !== undefined && (report[`${auditKey}-score`] = score);
  }
  // others
  report['dom-max-depth'] = getMaxDOMDepthCount(data);
  report['dom-max-child-elements'] = getMaxChildElementsCount(data);
  return report;
};

const audit = async (url: string): Promise<ILighthouseAuditReport> => {
  console.log(`Getting data for ${url}`);
  const lighthouseResponse = await launchChromeAndRunLighthouse(url, {
    extends: 'lighthouse:default'
  });
  console.log(`Successfully got data for ${url}`);
  return { raw: lighthouseResponse, dbPayload: filterResults(lighthouseResponse) };
};

const saveReport = async (url: string, data: ILighthouseRespose) => {
  try {
    const report = await ReportGenerator.generateReportHtml(data);
    const site = url.replace(/(^\w+:|^)\/\//, '');
    await fs.outputFile(path.join(__dirname, '../reports', site, `LATEST.html`), report);
    return fs.outputFile(
      path.join(__dirname, '../reports', site, `${new Date().toISOString()}.html`),
      report
    );
  } catch (err) {
    console.log(`Failed to generate report for ${url} ${JSON.stringify(err)}`);
    return Promise.reject('Failed to generate report');
  }
};

const auditAll = async (urls: ICronConfig['urls']): Promise<any> => {
  for (let { url, options } of urls) {
    console.log(`Analyzing ${url}...`);
    const report = await audit(url);
    await db.saveData(url, report.dbPayload);
    if (options.report) await saveReport(url, report.raw);
  }
};

const green = '![#178239](https://placehold.it/15/178239/000000?text=+)';
const orange = '![#e67700](https://placehold.it/15/e67700/000000?text=+)';
const red = '![#c7221f](https://placehold.it/15/c7221f/000000?text=+)';
const getColor = (score: number) => (score < 0.5 ? red : score < 0.9 ? orange : green); // TODO: get threshold from something else

const toSeconds = milliseconds => `${(milliseconds / 1000).toPrecision(3)}s`;
const toPercentage = score => `${Math.round(score * 100)}%`;
const toPercentageToColor = score => `${getColor(score)} ${toPercentage(score)}`;

// prettier-ignore
const generateGitHubComment = (report: IDBPayload, raw: any): string => {
  return `
<details>
<summary>AUDIT</summary>

#### Categories
|Category|Score|
-|-
|__Performance__|${toPercentageToColor(report['performance-score'])}|
|__Accessibility__|${toPercentageToColor(report['accessibility-score'])}|
|__Best Practices__|${toPercentageToColor(report['best-practices-score'])}|
|__Seo__|${toPercentageToColor(report['seo-score'])}|
|__PWA__|${toPercentageToColor(report['pwa-score'])}|


#### Performance Breakdown
|Metric|Time|Score|
-|-|-
|__First Contentful Paint__|${toSeconds(report['first-contentful-paint'])}|${toPercentageToColor(report['first-contentful-paint-score'])}|
|__First Meaningful Paint__|${toSeconds(report['first-meaningful-paint'])}|${toPercentageToColor(report['first-meaningful-paint-score'])}|
|__Speed Index__|${toSeconds(report['speed-index'])}|${toPercentageToColor(report['speed-index-score'])}|
|__First CPU Idle__|${toSeconds(report['first-cpu-idle'])}|${toPercentageToColor(report['first-cpu-idle-score'])}|
|__Time to Interactive__|${toSeconds(report.interactive)}|${toPercentageToColor(report['interactive-score'])}|
|__Estimated Input Latency__|${report["estimated-input-latency"]}ms|${toPercentageToColor(report["estimated-input-latency-score"])}|

</details>
  `;
};

export default {
  audit,
  auditAll,
  generateGitHubComment,
  saveReport
};
