import * as express from 'express';
import db from './influxdb';
import Logger from './logger';
import { ICollectItem } from './types';
import utils from './utils';
const router = express.Router();
const console = new Logger('[APP Collect Endpoint]: ');

router.get('/', async (req: express.Request, res: express.Response) => {
  const { query = {} } = req;
  const { url, report, mobile, userAgent, saveInDB } = query as ICollectItem;
  if (!url) return res.status(400).send('/collect missing `url` data');
  try {
    console.log(
      `Audit for ${url}, ${report && `Html Report`} ${mobile ? `Mobile` : ``} ${
        userAgent ? `userAgent: ${userAgent}` : ''
      }`
    );
    const { raw, dbPayload } = await utils.audit(url, mobile === 'true', userAgent);
    if (report) await utils.saveReport(url, raw);
    res.status(201).send(dbPayload);
    // Response filled, try to save in DB, fail silently
    if (saveInDB) db.saveData(url, dbPayload);
  } catch (err) {
    console.log(`Failed to get or save data for ${url} ${JSON.stringify(err)}`);
    res.sendStatus(500);
  }
});

export default router;
