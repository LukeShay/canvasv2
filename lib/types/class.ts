import { BaseType } from './common';

export interface IClass extends BaseType {
  adminId: string;
  building?: string;
  code: string;
  description?: string;
  name: string;
  room?: string;
  coverPhoto?: string;
}
