export default {
  DBNAME: 'lighthouse',
  AUDIT_KEYS: [
    // Performance Metrics
    'estimated-input-latency',
    'first-contentful-paint',
    'first-cpu-idle',
    'first-meaningful-paint',
    'interactive',
    'speed-index',
    // others
    'dom-size',
    'errors-in-console',
    'offscreen-images',
    'redirects',
    'time-to-first-byte',
    'total-byte-weight',
    'unminified-css',
    'unminified-javascript',
    'uses-passive-event-listeners',
    'uses-text-compression',
  ],
};
