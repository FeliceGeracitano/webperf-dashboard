import * as express from 'express';
import utils from '../utils';
import db from '../db/influxdb';
const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const { body = {} } = req;
  const { url, report = false } = body;
  if (!url) return res.status(400).send('/collect missing `url` data');
  try {
    const { raw, filteredData } = await utils.audit(url);
    await db.saveData(url, filteredData);
    if (report) await utils.saveReport(url, raw);
    res.status(201).send(filteredData);
  } catch (err) {
    console.error(`Failed to get or save data for ${url}`, err);
    res.sendStatus(500);
  }
});

export default router;
