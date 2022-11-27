import { withIronSessionApiRoute } from 'iron-session/next';
import withHandler from './withHandler';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: 'token',
  password: ")VtkA?F*v)um7;>D=$PSHw&^mTzf^P6^9C7GM$T(;:b[;p_L{'5C8B;)CD's",
};

function withSession(cb: ReturnType<typeof withHandler>) {
  return withIronSessionApiRoute(cb, cookieOption);
}

export default withSession;
