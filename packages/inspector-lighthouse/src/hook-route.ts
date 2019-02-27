import * as express from 'express';
const router = express.Router();
import * as github from '@octokit/rest';
import utils from './utils';

const octokit = new github();

router.post('/', async (req: express.Request, res: express.Response) => {
  const { body = {}, headers = {} } = req;
  const { url, owner, repo, number, token } = body;
  try {
    await octokit.authenticate({ type: 'token', token });
    if (headers['x-github-event'] === 'ping') return res.status(201).send('PONG');
    const { raw, dbPayload } = await utils.audit(url, false, undefined);
    const comment = utils.generateGitHubComment(dbPayload, raw);
    await octokit.issues.createComment({ owner, repo, number, body: comment });
    return res.status(200).send(`Data ${dbPayload}`);
  } catch (err) {
    return res.status(500).send(`ERROR ${err}`);
  }
});

export default router;
