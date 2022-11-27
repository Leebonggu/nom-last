import type { NextApiRequest, NextApiResponse } from 'next';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';
interface Options {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
}

function withHandler(options: Options) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { methods, handler } = options;
    if (req.method && !methods.includes(req.method as Method)) {
      res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}

export default withHandler;
