import * as express from 'express';
import utils from './utils';
import db from './influxdb';
import Logger from './logger';
import { CollectItem } from './types';
const router = express.Router();
const console = new Logger('[APP Collect-One Endpoint]: ');

router.post('/', async (req: express.Request, res: express.Response) => {
  const { body = {} } = req;
  const { url, report = false, lhFlags } = body as CollectItem;
  if (!url) return res.status(400).send('/collect-one missing `url` data');
  try {
    console.log(`Audit for ${url}${report ? ' with HTML Report.' : '.'}`);
    const { raw, dbPayload } = await utils.audit(url, lhFlags);
    if (report) await utils.saveReport(url, raw);
    res.status(201).send(dbPayload);
    // Response filled, try to save in DB, fail silently
    db.saveData(url, dbPayload);
  } catch (err) {
    console.log(`Failed to get or save data for ${url} ${JSON.stringify(err)}`);
    res.sendStatus(500);
  }
});

export default router;
