import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../../lib/withHandler';
import withSession from '../../../../lib/withSession';
import db from '../../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { user } = req.session;
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

    const isLiked = Boolean(
      await db.like.findFirst({
        where: {
          postId: post?.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      }),
    );

    return res.status(200).json({ ok: true, post, isLiked });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unexpected Error' });
  }
}

export default withSession(
  withHandler({ methods: ['GET', 'DELETE', 'PUT'], handler }),
);
