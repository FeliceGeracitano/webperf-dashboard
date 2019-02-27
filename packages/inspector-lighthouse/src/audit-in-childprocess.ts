import db from './influxdb';
import { ICollectItem } from './types';
import utils from './utils';
import Logger from './logger';
const console = new Logger('[App]: ');

async function runLighthouse(item: ICollectItem) {
  try {
    const { url, report } = item;
    if (!url) return undefined;
    const { raw, dbPayload } = await utils.audit(url);
    if (report) await utils.saveReport(url, raw);
    db.saveData(url, dbPayload);
    return { [url]: dbPayload };
  } catch (err) {
    return undefined;
  }
}

process.on('message', async item => {
  const result = await runLighthouse(item);
  process.send(result);
  process.exit(0);
});

console.log(`Child Process Loaded: ${process.pid}`);
