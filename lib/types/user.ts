import { BaseType } from './common';
import { IState } from './state';

export type IUser = BaseType & {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateId?: string;
  zip?: string;
  role: UserRole;
  picture?: string;
  state?: IState;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  POWER_USER = 'POWER_USER',
  BASIC = 'BASIC',
}
