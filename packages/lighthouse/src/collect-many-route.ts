import { fork } from 'child_process';
import * as express from 'express';
import { join } from 'path';
import Logger from './logger';
import { CollectAPIPayload } from './types';
const router = express.Router();
const console = new Logger('[APP Collect Many Endpoint]: ');

function runInParallel(iterable) {
  const promises = iterable.map(
    item =>
      new Promise(resolve => {
        const compute = fork(join(__dirname, 'audit-in-childprocess.js'));
        console.log(`Spawned child pid: ${compute.pid}`);
        compute.send(item);
        compute.on('message', result => resolve(result));
        compute.on('exit', function(code, signal) {
          console.log('child process exited with ' + `code ${code} and signal ${signal}`);
          resolve(null);
        });
      })
  );
  return Promise.all(promises).then(res => res);
}

router.post('/', async (req: express.Request, res: express.Response) => {
  const { body = {} } = req;
  const items = body as CollectAPIPayload;
  try {
    const result = await runInParallel(items);
    res.status(201).send(result);
    console.log(`Finished processed all CRON urls.`);
  } catch (err) {
    res.sendStatus(500);
    console.log(`Failed to audit. ${JSON.stringify(err)}`);
  }
});

export default router;
