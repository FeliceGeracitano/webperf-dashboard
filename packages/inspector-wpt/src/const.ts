export const DEFAULT_AUDIT = {
  url: '',
  saveInDB: false,
  mobile: 0,
  fvonly: 0
};
export const APP_PORT = process.env.APP_PORT || 3000;
export const WPT_TIMEOUT = 60000 * 5;
export const WPT_POLLING = 5000;
export const WPT_SERVER_URL_PORT = process.env.WPT_SERVER_URL_PORT || '30005';
export const WPT_SERVER_HOST = process.env.WPT_SERVER_HOST || 'localhost';
export const WPT_SERVER_URL = `http://${WPT_SERVER_HOST}:${WPT_SERVER_URL_PORT}`;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || '8086';
