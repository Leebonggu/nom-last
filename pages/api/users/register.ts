import type { NextApiRequest, NextApiResponse } from 'next';

import withHandler from '../../../lib/withHandler';
import withSession from '../../../lib/withSession';

import db from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, passwordConfirm } = req.body;
    console.log(email, password, passwordConfirm);

    if (password !== passwordConfirm) {
      return res.status(400).send({ ok: false, message: 'Not Equal Password' });
    }

    const alreadyUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyUser) {
      return res.status(400).send({ ok: false, message: 'Already Exist User' });
    }

    await db.user.create({
      data: {
        email,
        password,
        name: 'Newbie',
      },
    });
    return res.status(200).send({ ok: true });
  } catch (error) {
    return res.status(500).send({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['POST'], handler }));
