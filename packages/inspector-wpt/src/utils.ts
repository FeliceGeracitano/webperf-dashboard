import fetch from 'node-fetch';
import { clearInterval } from 'timers';
import { WPT_SERVER_URL, WPT_POLLING, WPT_TIMEOUT } from './const';
import Logger from './logger';
import { IRunTestComplete, IRunTestRespose, IParserRespose } from '../types/wpt';
import { pick, pipe, keys, length } from 'ramda';

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

const audit = async (url: string, mobile: string, fvonly: string): Promise<any> => {
  try {
    console.log(`Getting data for ${url}`);
    const runTestUrl = `${WPT_SERVER_URL}/runtest.php?f=json&url=${url}&mobile=${mobile}&fvonly=${fvonly}`;
    const runTestResp = await fetch(runTestUrl);
    const runTestRespJSON = (await runTestResp.json()) as IRunTestRespose;
    const audit = await loopUntillGetRespose(runTestRespJSON.data.jsonUrl);
    return audit;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const parseBreakDown = breakdown =>
  breakdown
    ? {
        content_html_compressed: breakdown.html.bytes,
        content_html_uncompressed: breakdown.html.bytesUncompressed,
        content_html_requests: breakdown.html.requests,
        content_js_compressed: breakdown.js.bytes,
        content_js_uncompressed: breakdown.js.bytesUncompressed,
        content_js_requests: breakdown.js.requests,
        content_css_compressed: breakdown.css.bytes,
        content_css_uncompressed: breakdown.css.bytesUncompressed,
        content_css_requests: breakdown.css.requests,
        content_image_compressed: breakdown.image.bytes,
        content_image_uncompressed: breakdown.image.bytesUncompressed,
        content_image_requests: breakdown.image.requests,
        content_font_compressed: breakdown.font.bytes,
        content_font_uncompressed: breakdown.font.bytesUncompressed,
        content_font_requests: breakdown.font.requests,
        content_other_compressed: breakdown.other.bytes,
        content_other_uncompressed: breakdown.other.bytesUncompressed,
        content_other_requests: breakdown.other.requests
      }
    : {};

const parseDetected = detected =>
  detected
    ? Object.keys(detected).reduce(
        (acc, next) => ({
          ...acc,
          [`detected_${next.replace(' ', '-').toLowerCase()}`]: detected[next]
        }),
        {}
      )
    : {};

const parseReport = (report: IRunTestComplete): IParserRespose => {
  const resp = Object.keys(report.data.median).reduce(
    (acc, nextView: 'firstView' | 'repeatView') => {
      const breakdown = parseBreakDown(report.data.median[nextView].breakdown);
      const detected = parseDetected(report.data.median[nextView].detected);
      return {
        ...acc,
        [nextView]: {
          id: report.data.id,
          ...breakdown,
          ...detected,
          domainsCount: pipe(
            keys,
            length
          )(report.data.median[nextView].domains),
          ...pick(
            [
              'SpeedIndex',
              'FirstInteractive',
              'TimeToInteractive',
              'render',
              'TTFB',
              'docTime',
              'bytesInDoc',
              'requestsDoc',
              'userTime',
              'fullyLoaded',
              'bytesIn',
              'requestsFull',
              'lastVisualChange',
              'domElements',
              'firstContentfulPaint'
            ],
            report.data.median[nextView]
          )
        }
      };
    },
    {}
  );
  return resp as IParserRespose;
};

export default {
  audit,
  parseReport
};
