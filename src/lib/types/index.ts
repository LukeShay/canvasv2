import { IUser } from './user';

export * from './user';
export * from './common';

export type ContextType = {
  user?: IUser;
  rid: string;
};
