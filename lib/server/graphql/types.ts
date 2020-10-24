import { NextApiResponse } from 'next';
import { IUser } from '../../types';

export interface Context {
  user?: IUser;
  res: NextApiResponse;
}

export interface MutationArgs<T = unknown> {
  input: T;
}
