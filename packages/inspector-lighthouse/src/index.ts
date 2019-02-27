import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import collectMany from './collect-many-route';
import collectOne from './collect-one-route';
import hook from './hook-route';
import Logger from './logger';

const app = express();
const console = new Logger('[App]: ');

app.use(bodyParser.json());
app.use('/hook', hook);
app.use('/collect-one', collectOne);
app.use('/collect-many', collectMany);
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));
app.listen(3000, async () => console.log('Init, listening on port 3000'));
