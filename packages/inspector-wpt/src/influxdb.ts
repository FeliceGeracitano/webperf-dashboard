import Logger from './logger';
import * as influx from 'influx';
import { IParserRespose } from 'wpt';
import { DB_HOST, DB_PORT } from './const';
const console = new Logger('[DB Connector]: ');

// DB instance
const DB = new influx.InfluxDB({ host: DB_HOST, port: DB_PORT });

const initConnection = async (dbName: string) => {
  try {
    const names = await DB.getDatabaseNames();
    if (names.indexOf(dbName) === -1) return await DB.createDatabase(dbName);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject('Database: Failed to initialise Connection');
  }
};

const getDBName = (mobile: string, fvonly: string) =>
  `WPT_${mobile === '1' ? 'MOBILE' : 'DESKTOP'}_${fvonly === '1' ? 'FIRSTVIEW' : 'REPETEDVIEW'}`;

const getPoints = (url, data) =>
  Object.keys(data).reduce((acc, key) => {
    if (data[key]) acc.push({ measurement: key, tags: { url }, fields: { value: data[key] } });
    return acc;
  }, []);

export default {
  saveInDB: async (
    url: any,
    mobile: string,
    fvonly: string,
    { firstView, repeatView }: IParserRespose
  ) => {
    try {
      let DBNAME = getDBName(mobile, '1');
      await initConnection(DBNAME);
      let points = getPoints(url, firstView);
      await DB.writePoints(points, { database: DBNAME });

      if (fvonly === '1') return true;
      DBNAME = getDBName(mobile, '0');
      await initConnection(DBNAME);
      points = getPoints(url, repeatView);
      await DB.writePoints(points, { database: DBNAME });
    } catch (err) {
      console.log(err);
    }
  }
};
