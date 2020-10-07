import { BaseType } from './common';

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
};

export enum UserRole {
  ADMIN = 'ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  POWER_USER = 'POWER_USER',
  BASIC = 'BASIC',
}
