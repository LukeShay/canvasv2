/**
 * @jest-environment node
 */

import { NextPageContext } from 'next';
import { getServerSideRedirect } from '../../../lib/client/redirect';
import { UserRole } from '../../../lib/types';

const contextMock = ({
  res: {
    writeHead: jest.fn(),
    end: jest.fn(),
  },
} as unknown) as NextPageContext;
const redirect = '/redirect';

describe('getServerSideRedirect', () => {
  it('should redirect when there is a not a viewer but is a role', async () => {
    expect.hasAssertions();

    jest.doMock('next-auth/client', () => ({ getSession: jest.fn().mockResolvedValue(null) }));

    expect(await getServerSideRedirect(contextMock, redirect, UserRole.ADMIN)).toStrictEqual({
      props: { viewer: null },
    });
    expect(contextMock.res?.writeHead).toHaveBeenCalledTimes(1);
    expect(contextMock.res?.writeHead).toHaveBeenCalledWith(307, { Location: redirect });
    expect(contextMock.res?.end).toHaveBeenCalledTimes(1);
  });
});
