import * as bodyParser from 'body-parser';
import * as express from 'express';
import auditRoute from './audit-route';
import Logger from './logger';
import { APP_PORT } from './const';

const app = express();
const console = new Logger('[App]: ');

app.use(bodyParser.json());
app.use('/audit', auditRoute);
app.listen(APP_PORT, async () => console.log(`Init, listening on port ${APP_PORT}`));
