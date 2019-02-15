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
      repeatView: IRunTestCompleteView;
    };
  };
  statusCode: number;
  statusText: string;
  webPagetestVersion: string;
}

export declare interface IRunTestCompleteView {
  minify_total: -1;
  cpuTimes: {
    Paint: 0;
    Idle: 11064;
  };
  responses_200: 111;
  testStartOffset: 0;
  bytesOut: 24019;
  gzip_savings: 20768;
  requestsFull: 114;
  start_epoch: 0;
  connections: 43;
  base_page_cdn: 'Akamai';
  bytesOutDoc: 17223;
  result: 0;
  final_base_page_request_id: 'CF935D531E511CDCF5B81EF9492ADB06';
  score_cookies: -1;
  basePageSSLTime: 141;
  docTime: 8062;
  domContentLoadedEventEnd: 5254;
  image_savings: 4712;
  requestsDoc: 92;
  firstMeaningfulPaint: 4756;
  firstTextPaint: 4007;
  firstPaint: 3830.0249999993;
  score_cdn: 96;
  'cpu.Idle': 11064;
  optimization_checked: 1;
  image_total: 231748;
  score_minify: -1;
  gzip_total: 1539047;
  responses_404: 0;
  loadTime: 8062;
  URL: 'https://www.gazzetta.it';
  score_combine: -1;
  firstContentfulPaint: 4007;
  firstLayout: 3786;
  score_etags: -1;
  loadEventStart: 8061;
  cpuTimesDoc: {
    Paint: 0;
    Idle: 8062;
  };
  minify_savings: -1;
  score_progressive_jpeg: 0;
  domInteractive: 5108;
  score_gzip: 99;
  'cpu.Paint': 0;
  score_compress: 98;
  domContentLoadedEventStart: 5109;
  final_url: 'https://www.gazzetta.it/';
  bytesInDoc: 1445636;
  firstImagePaint: 4115;
  'score_keep-alive': 100;
  loadEventEnd: 8097;
  cached: 0;
  score_cache: 50;
  responses_other: 3;
  main_frame: 'F39498E68E5D4A5A8CD7E132415E2C2A';
  fullyLoaded: 11064;
  requests: [];
  final_base_page_request: 0;
  TTFB: 1289;
  bytesIn: 1605773;
  test_run_time_ms: 16269;
  browser_version: '72.0.3626.96';
  base_page_dns_server: 'dnsgeo5.tuonomeregistrar.com';
  fullyLoadedCPUms: 8019;
  'PerformancePaintTiming.first-contentful-paint': 4006.7199999994;
  base_page_ip_ptr: 'a104-113-4-166.deploy.static.akamaitechnologies.com';
  eventName: 'Step_1';
  detected: {
    'Tag Managers': 'Google Tag Manager';
    Analytics: 'Chartbeat,Dynatrace,Google Analytics,SiteCatalyst';
    'Web Frameworks': 'ZURB Foundation 4.3.2';
    'JavaScript Libraries': 'Modernizr 2.6.2,jQuery 1.10.2';
    'JavaScript Frameworks': 'ExtJS';
    'Advertising Networks': 'Open AdStream';
    Miscellaneous: 'webpack';
  };
  base_page_cname: 'www2.gazzetta.it.edgekey.net';
  document_URL: 'https://www.gazzetta.it/';
  date: 1550156316.7607;
  'PerformancePaintTiming.first-paint': 3830.0249999993;
  domElements: 3590;
  browserVersion: '72.0.3626.96';
  document_origin: 'https://www.gazzetta.it';
  browser_name: 'Chrome';
  detected_apps: {
    jQuery: '1.10.2';
    'ZURB Foundation': '4.3.2';
    SiteCatalyst: '';
    Modernizr: '2.6.2';
    'Google Tag Manager': '';
    Chartbeat: '';
    Dynatrace: '';
    'Google Analytics': '';
    'Open AdStream': '';
    webpack: '';
    ExtJS: '';
  };
  fullyLoadedCPUpct: 10.014985015;
  domComplete: 8060;
  document_hostname: 'www.gazzetta.it';
  interactivePeriods: [[0, 4287]];
  SpeedIndex: 4458;
  visualComplete85: 4900;
  visualComplete90: 5000;
  visualComplete95: 5300;
  visualComplete99: 5300;
  visualComplete: 8500;
  render: 4000;
  lastVisualChange: 8500;
  chromeUserTiming: [
    {
      name: 'fetchStart';
      time: 15;
    },
    {
      name: 'unloadEventStart';
      time: 1295;
    },
    {
      name: 'unloadEventEnd';
      time: 1295;
    },
    {
      name: 'domLoading';
      time: 1296;
    },
    {
      name: 'responseEnd';
      time: 1425;
    },
    {
      name: 'firstLayout';
      time: 3785;
    },
    {
      name: 'firstPaint';
      time: 3830;
    },
    {
      name: 'firstMeaningfulPaintCandidate';
      time: 3830;
    },
    {
      name: 'firstMeaningfulPaintCandidate';
      time: 4006;
    },
    {
      name: 'firstTextPaint';
      time: 4006;
    },
    {
      name: 'firstContentfulPaint';
      time: 4006;
    },
    {
      name: 'firstImagePaint';
      time: 4115;
    },
    {
      name: 'firstMeaningfulPaint';
      time: 4755;
    },
    {
      name: 'firstMeaningfulPaint';
      time: 4755;
    },
    {
      name: 'firstMeaningfulPaintCandidate';
      time: 4755;
    },
    {
      name: 'domInteractive';
      time: 5108;
    },
    {
      name: 'domContentLoadedEventStart';
      time: 5109;
    },
    {
      name: 'domContentLoadedEventEnd';
      time: 5254;
    },
    {
      name: 'domComplete';
      time: 8060;
    },
    {
      name: 'loadEventStart';
      time: 8061;
    },
    {
      name: 'loadEventEnd';
      time: 8097;
    }
  ];
  'chromeUserTiming.fetchStart': 15;
  'chromeUserTiming.unloadEventStart': 1295;
  'chromeUserTiming.unloadEventEnd': 1295;
  'chromeUserTiming.domLoading': 1296;
  'chromeUserTiming.responseEnd': 1425;
  'chromeUserTiming.firstLayout': 3785;
  'chromeUserTiming.firstPaint': 3830;
  'chromeUserTiming.firstMeaningfulPaintCandidate': 4755;
  'chromeUserTiming.firstTextPaint': 4006;
  'chromeUserTiming.firstContentfulPaint': 4006;
  'chromeUserTiming.firstImagePaint': 4115;
  'chromeUserTiming.firstMeaningfulPaint': 4755;
  'chromeUserTiming.domInteractive': 5108;
  'chromeUserTiming.domContentLoadedEventStart': 5109;
  'chromeUserTiming.domContentLoadedEventEnd': 5254;
  'chromeUserTiming.domComplete': 8060;
  'chromeUserTiming.loadEventStart': 8061;
  'chromeUserTiming.loadEventEnd': 8097;
  blinkFeatureFirstUsed: {
    AnimatedCSSFeatures: [];
    CSSFeatures: {};
    Features: {};
  };
  TTIMeasurementEnd: 4287;
  LastInteractive: 4006;
  step: 1;
  effectiveBps: 164273;
  effectiveBpsDoc: 213441;
  domTime: 0;
  aft: 0;
  titleTime: 0;
  domLoading: 0;
  server_rtt: 0;
  smallImageCount: 23;
  bigImageCount: 0;
  maybeCaptcha: 0;
  domains: {
    [key: string]: Domain;
  };
  breakdown: {
    html: IbreakdownItem;
    js: IbreakdownItem;
    css: IbreakdownItem;
    image: IbreakdownItem;
    flash: IbreakdownItem;
    font: IbreakdownItem;
    video: IbreakdownItem;
    other: IbreakdownItem;
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

export interface IDBPayload {
  id: string; // to build report url report.php?id=${id}
  SpeedIndex: number; // sec
  FirstInteractive: number;
  render: number;
  TTFB: number; // Time first byte
  // doc loaded
  docTime: number;
  bytesInDoc: number;
  requestsDoc: number;
  userTime: number;
  // fully loaded
  fullyLoaded: number;
  bytesIn: number;
  requestsFull: number;
}
