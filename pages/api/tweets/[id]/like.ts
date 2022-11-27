import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../lib/withHandler';
import withSession from '../../../../lib/withSession';
import db from '../../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      session: { user },
      query: { id },
    } = req;

    const like = await db.like.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
    });

    if (like) {
      await db.like.delete({
        where: {
          id: like.id,
        },
      });
      return;
    }

    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(withHandler({ methods: ['POST'], handler }));
