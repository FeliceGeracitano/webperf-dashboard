import { CronJob } from 'cron';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from '../config.json';
import db from './db/influxdb';
import * as serveIndex from 'serve-index';
import collect from './routes/collect';

const app = express();
app.use(bodyParser.json());

const { cron } = config;

app.use('/collect', collect);
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));

app.listen(3000, async () => {
  console.log('Application listening on port 3000');
  try {
    await db.init();
    if (!cron) return;
    new CronJob(cron, () => console.log('CronJob'), null, true, 'Europe/London', null, true);
  } catch (err) {
    console.log(err);
  }
});
