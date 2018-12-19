export interface IDB {
  init(): Promise<any>;
  saveData(url: string, data: IfilterResults): Promise<any>;
}

export interface ReportData {}

export interface audits {
  description: string;
  score: number | null | undefined;
  rawValue: number;
}

export interface catergoryScore {
  score: number;
}

export const Iaudits = {
  // Performance Metrics
  'estimated-input-latency': {} as audits,
  'first-contentful-paint': {} as audits,
  'first-cpu-idle': {} as audits,
  'first-meaningful-paint': {} as audits,
  interactive: {} as audits,
  'speed-index': {} as audits,
  // others
  'dom-size': {} as audits,
  'errors-in-console': {} as audits,
  'offscreen-images': {} as audits,
  redirects: {} as audits,
  'time-to-first-byte': {} as audits,
  'total-byte-weight': {} as audits,
  'unminified-css': {} as audits,
  'unminified-javascript': {} as audits,
  'uses-passive-event-listeners': {} as audits,
  'uses-text-compression': {} as audits
};

export const Icategories = {
  performance: {} as catergoryScore,
  'best-practices': {} as catergoryScore,
  pwa: {} as catergoryScore,
  accessibility: {} as catergoryScore,
  seo: {} as catergoryScore
};

export interface IlighthouseRespose {
  audits: typeof Iaudits;
  categories: typeof Icategories;
}

export interface IfilterResults {
  // general
  'accessibility-score': number;
  'best-practices-score': number;
  'performance-score': number;
  'pwa-score': number;
  'seo-score': number;

  // others
  'dom-max-child-elements': number;
  'dom-max-depth': number;

  // performance audits
  'estimated-input-latency': number;
  'first-contentful-paint': number;
  'first-cpu-idle': number;
  'first-meaningful-paint': number;
  interactive: number;
  'speed-index': number;
  'dom-size': number;
  'errors-in-console': number;
  'offscreen-images': number;
  redirects: number;
  'time-to-first-byte': number;
  'total-byte-weight': number;
  'unminified-css': number;
  'unminified-javascript': number;
  'uses-passive-event-listeners': number;
  'uses-text-compression': number;

  // performance audits scores
  'estimated-input-latency-score': number;
  'first-contentful-paint-score': number;
  'first-cpu-idle-score': number;
  'first-meaningful-paint-score': number;
  'interactive-score': number;
  'speed-index-score': number;
  'dom-size-score': number;
  'errors-in-console-score': number;
  'offscreen-images-score': number;
  'redirects-score': number;
  'time-to-first-byte-score': number;
  'total-byte-weight-score': number;
  'unminified-css-score': number;
  'unminified-javascript-score': number;
  'uses-passive-event-listeners-score': number;
  'uses-text-compression-score': number;
}
