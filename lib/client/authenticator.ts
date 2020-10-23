import { IUser, UserRole } from '../types';

export function atLeastPowerUser({ role }: IUser) {
  return role === UserRole.POWER_USER || role === UserRole.ORG_ADMIN || role === UserRole.ADMIN;
}

export function atLeastOrgAdmin({ role }: IUser) {
  return role === UserRole.ORG_ADMIN || role === UserRole.ADMIN;
}

export function atLeastAdmin({ role }: IUser) {
  return role === UserRole.ADMIN;
}
