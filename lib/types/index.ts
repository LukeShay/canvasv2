import { IUser } from './user';

export * from './user';
export * from './common';
export * from './class';
export * from './state';

export type ContextType = {
  user?: IUser;
  rid: string;
};
