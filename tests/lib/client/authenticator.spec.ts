import { atLeastPowerUser, atLeastAdmin, atLeastOrgAdmin } from '../../../lib/client/authenticator';
import { UserRole } from '../../../lib/types';
import { generateIUser } from '../../utils';

describe('atLeastPowerUser', () => {
  it('should return false for a basic user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    expect(atLeastPowerUser(user)).toBeFalsy();
  });

  it('should return true for a power user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.POWER_USER;
    expect(atLeastPowerUser(user)).toBeTruthy();
  });

  it('should return true for an org admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ORG_ADMIN;
    expect(atLeastPowerUser(user)).toBeTruthy();
  });

  it('should return true for an admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ADMIN;
    expect(atLeastPowerUser(user)).toBeTruthy();
  });
});

describe('atLeastOrgAdmin', () => {
  it('should return false for a basic user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    expect(atLeastOrgAdmin(user)).toBeFalsy();
  });

  it('should return false for a power user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.POWER_USER;
    expect(atLeastOrgAdmin(user)).toBeFalsy();
  });

  it('should return true for an org admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ORG_ADMIN;
    expect(atLeastOrgAdmin(user)).toBeTruthy();
  });

  it('should return true for an admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ADMIN;
    expect(atLeastOrgAdmin(user)).toBeTruthy();
  });
});

describe('atLeastAdmin', () => {
  it('should return false for a basic user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    expect(atLeastAdmin(user)).toBeFalsy();
  });

  it('should return false for a power user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.POWER_USER;
    expect(atLeastAdmin(user)).toBeFalsy();
  });

  it('should return true for an org admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ORG_ADMIN;
    expect(atLeastAdmin(user)).toBeFalsy();
  });

  it('should return true for an admin user', () => {
    expect.hasAssertions();
    const user = generateIUser();
    user.role = UserRole.ADMIN;
    expect(atLeastAdmin(user)).toBeTruthy();
  });
});
