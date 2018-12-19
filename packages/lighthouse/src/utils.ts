import * as chromeLauncher from 'chrome-launcher';
import * as lighthouse from 'lighthouse';
import { path as Rpath, pipe } from 'ramda';
import { IlighthouseRespose, Icategories, Iaudits, IfilterResults } from './db/types';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';

const getMaxDOMDepthCount = pipe(
  Rpath(['audits', 'dom-size', 'details', 'items', 1, 'value']),
  parseFloat
);
const getMaxChildElementsCount = pipe(
  Rpath(['audits', 'dom-size', 'details', 'items', 2, 'value']),
  parseFloat
);

const launchChromeAndRunLighthouse = async (url, config): Promise<IlighthouseRespose> => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-zygote', '--no-sandbox'],
  });
  const flags = { port: chrome.port, output: 'json' };
  const result = await lighthouse(url, flags, config);
  await chrome.kill();
  return result.lhr;
};

const filterResults = (data: IlighthouseRespose): IfilterResults => {
  const { categories, audits } = data;
  const report = {} as IfilterResults;

  // Main Categories
  for (let categoryKey in Icategories) {
    if (!Object.prototype.hasOwnProperty.call(categories, categoryKey)) continue;
    report[`${categoryKey}-score`] = categories[categoryKey].score;
  }

  // performance audits
  for (let auditKey in Iaudits) {
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

export default {
  audit: async (
    url: string
  ): Promise<{ raw: IlighthouseRespose; filteredData: IfilterResults }> => {
    console.info(`Getting data for ${url}`);
    const lighthouseResponse = await launchChromeAndRunLighthouse(url, {
      extends: 'lighthouse:default',
    });
    console.info(`Successfully got data for ${url}`);
    return { raw: lighthouseResponse, filteredData: filterResults(lighthouseResponse) };
  },
  saveReport: async (url: string, data: any) => {
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
      console.error(`Failed to generate report for ${url}`, err);
      return Promise.reject('Failed to generate report');
    }
  },
};
