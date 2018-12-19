import * as influx from 'influx';
import constants from '../constants';
import { IDB, IfilterResults } from './types';

// DB instance
const { DBNAME } = constants;
const DB = new influx.InfluxDB({
  host: process.env.HOST || 'localhost',
  database: DBNAME
});

export default {
  init: async () => {
    try {
      const names = await DB.getDatabaseNames();
      if (names.indexOf(DBNAME) === -1) {
        console.info('Database does not exist. Creating database');
        return DB.createDatabase(DBNAME);
      }
      console.info('Database exist. Connection ready');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject('Failed to initialise');
    }
  },
  saveData: async (url: any, data: IfilterResults) => {
    try {
      const points = Object.keys(data).reduce((points, key) => {
        if (data[key])
          points.push({ measurement: key, tags: { url }, fields: { value: data[key] } });
        return points;
      }, []);
      const result = await DB.writePoints(points);
      console.info(`Successfully saved lighthouse data for ${url}`);
      return result;
    } catch (err) {
      console.error(`Failed to save lighthouse data for ${url}`, err);
    }
  }
} as IDB;
