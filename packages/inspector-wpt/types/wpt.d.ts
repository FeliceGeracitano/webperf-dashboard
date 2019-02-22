export interface IRunTestRespose {
  statusCode: number;
  statusText: string;
  data: {
    testId: string;
    ownerKey: string;
    jsonUrl: string;
    xmlUrl: string;
    userUrl: string;
    summaryCSV: string;
    detailCSV: string;
  };
}

export interface IRunTestComplete {
  data: {
    testInfo?: any;
    id: string;
    url: string;
    summary: string;
    testUrl: string;
    location: string;
    mobile: number;
    tester: string;
    fvonly: true;
    median: {
      firstView: IRunTestCompleteView;
      repeatView?: IRunTestCompleteView;
    };
  };
  statusCode: number;
  statusText: string;
  webPagetestVersion: string;
}

export declare interface IRunTestCompleteView {
  FirstInteractive: number;
  SpeedIndex: number;
  render: number;
  TTFB: number;
  docTime: number;
  bytesInDoc: number;
  requestsDoc: number;
  userTime: number;
  fullyLoaded: number;
  bytesIn: number;
  domains: any[];
  domElements: number;
  firstContentfulPaint: number;
  breakdown: {
    html: IbreakdownItem;
    js: IbreakdownItem;
    css: IbreakdownItem;
    image: IbreakdownItem;
    font: IbreakdownItem;
    video: IbreakdownItem;
    other: IbreakdownItem;
  };
  detected: {
    [key: string]: string;
  };
}

export interface IbreakdownItem {
  bytes: number;
  bytesUncompressed: number;
  requests: number;
}

export interface Domain {
  bytes: number;
  requests: number;
  cdn_provider: string;
  connections: number;
}

export interface IParserRespose {
  firstView: IDBPayload;
  repeatView?: IDBPayload;
}

export interface IDBPayload {
  id: string; // to build report url report.php?id=${id}
  SpeedIndex: number; // sec
  FirstInteractive: number;
  userTime: number;
  render: number;
  TTFB: number; // Time first byte
  // doc loaded
  docTime: number;
  bytesInDoc: number;
  requestsDoc: number;
  // fully loaded
  fullyLoaded: number;
  bytesIn: number;
  requestsFull: number;

  // other
  lastVisualChange: number;

  // Performance breakdown
  firstContentfulPaint: number;
  firstMeaningfulPaint: number;
  'cpu.Idle': number;

  // content
  content_html_compressed: number;
  content_html_uncompressed: number;
  content_js_compressed: number;
  content_js_uncompressed: number;
  content_css_compressed: number;
  content_css_uncompressed: number;
  content_image_compressed: number;
  content_image_uncompressed: number;
  content_font_compressed: number;
  content_font_uncompressed: number;
  content_other_compressed: number;
  content_other_uncompressed: number;
}
