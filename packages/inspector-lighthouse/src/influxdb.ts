import * as influx from 'influx';
import { IDB, IDBPayload } from './types';
import Logger from './logger';
import { DB_HOST, DB_PORT } from './const';
const console = new Logger('[DB Connector]: ');

// DB instance
const DBNAME = 'lighthouse';
const DB = new influx.InfluxDB({
  host: DB_HOST,
  port: DB_PORT,
  database: DBNAME
} as any);

const initConnection = async () => {
  try {
    const names = await DB.getDatabaseNames();
    if (names.indexOf(DBNAME) === -1) {
      console.log('Database does not exist. Creating database');
      return DB.createDatabase(DBNAME);
    }
    console.log('Database exist. Connection ready');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject('Database: Failed to initialise Connection');
  }
};

export default {
  init: initConnection,
  saveData: async (url: any, data: IDBPayload) => {
    try {
      await initConnection();
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
