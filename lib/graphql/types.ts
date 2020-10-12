import { NextApiResponse } from 'next';
import { UserModel } from '../api/domain';

export interface Context {
  user?: UserModel;
  res: NextApiResponse;
}

export interface MutationArgs<T = unknown> {
  input: T;
}
