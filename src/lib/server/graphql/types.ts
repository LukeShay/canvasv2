import { NextApiResponse } from 'next';
import { UserModel } from '../domain';

export interface Context {
  user?: UserModel;
  res: NextApiResponse;
}

export interface MutationArgs<T = unknown> {
  input: T;
}
