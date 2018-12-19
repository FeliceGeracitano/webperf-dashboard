import * as chromeLauncher from 'chrome-launcher';
import * as fs from 'fs-extra';
import * as lighthouse from 'lighthouse';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import * as path from 'path';
import { path as Rpath, pipe } from 'ramda';
import {
  IAudits,
  ICategories,
  ICronConfig,
  IDBPayload,
  ILighthouseAuditReport,
  ILighthouseRespose
} from './types';
import Logger from './logger';
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
    return fs.outputFile(
      path.join(
        __dirname,
        '../reports',
        url.replace(/(^\w+:|^)\/\//, ''),
        `${new Date().toISOString()}.html`
      ),
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
    if (options.report) await saveReport(url, report.raw);
  }
};

export default {
  audit,
  saveReport,
  auditAll
};
