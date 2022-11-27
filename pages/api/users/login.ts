import type { NextApiRequest, NextApiResponse } from 'next';

import withHandler from '../../../lib/withHandler';
import withSession from '../../../lib/withSession';

import db from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    if (!email)
      return res.status(400).send({ ok: false, message: 'Email is Required' });
    if (!password)
      return res
        .status(400)
        .send({ ok: false, message: 'Password is Required' });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({ ok: false, message: 'Not Exist User' });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .send({ ok: false, message: 'Password Not Matching' });
    }

    req.session.user = {
      id: user.id,
    };
    await req.session.save();

    return res.status(200).send({ ok: true });
  } catch (error) {
    return res.status(500).send({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['POST'], handler }));
