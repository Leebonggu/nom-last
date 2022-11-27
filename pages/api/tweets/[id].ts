import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../lib/withHandler';
import withSession from '../../../lib/withSession';
import db from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log(id, id);
    const post = await db.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, post });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(
  withHandler({ methods: ['GET', 'DELETE', 'PUT'], handler }),
);
