import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../lib/withHandler';
import db from '../../../lib/db';
import withSession from '../../../lib/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      method,
      body: { post },
      session: { user },
    } = req;
    switch (method) {
      case 'GET':
        const posts = await db.post.findMany({
          include: {
            user: true,
            _count: {
              select: {
                likes: true,
              },
            },
          },
        });

        return res.status(200).send({ ok: true, posts });
      case 'POST':
        const newPost = await db.post.create({
          data: {
            post,
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        });
        return res.status(200).send({ ok: true, post: newPost });
      default:
        return res
          .status(400)
          .json({ ok: false, message: 'Request Method Error' });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['POST', 'GET'], handler }));
