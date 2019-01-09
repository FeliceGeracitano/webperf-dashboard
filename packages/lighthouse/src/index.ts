import * as bodyParser from 'body-parser';
import { CronJob } from 'cron';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import * as config from '../config.json';
import collect from './collect-route';
import hook from './hook-route';
import db from './influxdb';
import Logger from './logger';
import { ICronConfig } from './types';
import utils from './utils';

const { cron, urls } = config as ICronConfig;
const app = express();
const console = new Logger('[App]: ');

app.use(bodyParser.json());
app.use('/hook', hook);
app.use('/collect', collect);
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));
app.listen(3000, async () => {
  console.log('Init, listening on port 3000');
  try {
    await db.init();
    if (!cron) return;
    new CronJob(cron, () => utils.auditAll(urls), null, true, 'Europe/London', null, true);
  } catch (err) {
    console.log(err);
  }
});
