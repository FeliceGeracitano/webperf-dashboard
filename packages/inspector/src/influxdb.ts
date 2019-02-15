import Logger from './logger';
import * as influx from 'influx';
const console = new Logger('[DB Connector]: ');

// DB instance
const DBNAME = 'wpt';
const DB = new influx.InfluxDB({ host: process.env.HOST || 'localhost', database: DBNAME });

const initConnection = async () => {
  try {
    const names = await DB.getDatabaseNames();
    if (names.indexOf(DBNAME) === -1) return await DB.createDatabase(DBNAME);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject('Database: Failed to initialise Connection');
  }
};

const getDBName = (mobile: number, fvonly: number) =>
  `WPT_${mobile === 1 ? 'MOBILE' : 'DESKTOP'}_${
    fvonly === 1 ? 'FIRSTVIEW' : 'WPT_DESKTOP_REPETEDVIEW'
  }`;

export default {
  saveInDB: async (url: any, mobile: number, fvonly: number, reportJSON: any) => {
    let DB_NAME = getDBName(mobile, 1);
    console.log(`DB_NAME: ${DB_NAME}`);
    if (fvonly !== 1) return true;
    DB_NAME = getDBName(mobile, 0);
    console.log(`DB_NAME: ${DB_NAME}`);
  }
};
