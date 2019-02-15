import fetch from 'node-fetch';
import { clearInterval } from 'timers';
import { LOCAL_WPT_SERVER_URL, WPT_POLLING, WPT_TIMEOUT } from './const';
import Logger from './logger';
import { IRunTestComplete, IRunTestRespose } from '../types/wpt';

const console = new Logger('[Audit tools]: ');

// TODO: simplify with RxJs
const loopUntillGetRespose = async url => {
  let urlTest;
  return new Promise((resolve, reject) => {
    let keepPolling;
    const tookTooMuch = setTimeout(
      () => abort() && reject(`${urlTest}: Test Took too much`),
      WPT_TIMEOUT
    );
    const abort = () => {
      clearInterval(keepPolling);
      clearTimeout(tookTooMuch);
      return true;
    };

    const poll = async function() {
      const resp = await fetch(url);
      const respJson = (await resp.json()) as IRunTestComplete;
      urlTest = respJson.data.url || (respJson.data.testInfo && respJson.data.testInfo.url);
      console.log(`${urlTest}: ${respJson.statusText}`);
      switch (respJson.statusCode) {
        case 100:
        case 101:
          break;
        case 200:
          abort() && resolve(respJson);
          break;
        default:
          abort() && reject(respJson);
          break;
      }
    };
    poll();
    keepPolling = setInterval(() => poll(), WPT_POLLING);
  });
};

const audit = async (url: string, mobile: number, fvonly: number): Promise<any> => {
  try {
    console.log(`Getting data for ${url}`);
    const wptUrl = process.env.wptUrl || LOCAL_WPT_SERVER_URL;
    const runTestUrl = `${wptUrl}runtest.php?f=json&url=${url}&mobile=${mobile}&fvonly=${fvonly}`;
    const runTestResp = await fetch(runTestUrl);
    const runTestRespJSON = (await runTestResp.json()) as IRunTestRespose;
    const audit = await loopUntillGetRespose(runTestRespJSON.data.jsonUrl);
    return audit;
  } catch (err) {
    return err;
  }
};

const parseReport = report => report;

export default {
  audit,
  parseReport
};
