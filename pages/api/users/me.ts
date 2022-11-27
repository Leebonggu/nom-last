import type { NextApiRequest, NextApiResponse } from 'next';

import withHandler from '../../../lib/withHandler';
import withSession from '../../../lib/withSession';

import db from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profile = await db.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });

    return res.status(200).send({ ok: true, profile });
  } catch (error) {
    return res.status(500).send({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['GET'], handler }));
