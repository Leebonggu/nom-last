import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../lib/withHandler';
import withSession from '../../../lib/withSession';
import db from '../../../lib/db';

function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['POST'], handler }));
