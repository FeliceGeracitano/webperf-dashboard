import * as influx from 'influx';
import { IDB, IDBPayload } from './types';
import Logger from './logger';
const console = new Logger('[DB Connector]: ');

// DB instance
const DBNAME = 'lighthouse';
const DB = new influx.InfluxDB({
  host: process.env.HOST || 'localhost',
  database: DBNAME
});

export default {
  init: async () => {
    try {
      const names = await DB.getDatabaseNames();
      if (names.indexOf(DBNAME) === -1) {
        console.log('Database does not exist. Creating database');
        return DB.createDatabase(DBNAME);
      }
      console.log('Database exist. Connection ready');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject('Failed to initialise');
    }
  },
  saveData: async (url: any, data: IDBPayload) => {
    try {
      const points = Object.keys(data).reduce((points, key) => {
        if (data[key])
          points.push({ measurement: key, tags: { url }, fields: { value: data[key] } });
        return points;
      }, []);
      const result = await DB.writePoints(points);
      console.log(`Successfully saved lighthouse data for ${url}`);
      return result;
    } catch (err) {
      console.log(`Failed to save lighthouse data for ${url} ${JSON.stringify(err)}`);
    }
  }
} as IDB;
