import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';
import { getSession } from 'next-auth/client';

export async function context(ctx: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await getSession(ctx);

  return {
    ...ctx,
    rid: v4(),
    user: session?.user,
  };
}
