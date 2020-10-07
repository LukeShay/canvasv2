import { serialize, parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export function setTokenCookies(res: NextApiResponse, authorization: string, refresh: string) {
  const authorizationCookie = serialize('authorization', authorization, {
    maxAge: 86400,
    expires: new Date(Date.now() + 86400 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });

  const refreshCookie = serialize('refresh', refresh, {
    maxAge: 604800,
    expires: new Date(Date.now() + 604800 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });

  res.setHeader('Set-Cookie', [authorizationCookie, refreshCookie]);
}

export function removeTokenCookies(res: NextApiResponse) {
  const authorizationCookie = serialize('authorization', '', { maxAge: -1, path: '/' });
  const refreshCookie = serialize('refresh', '', { maxAge: -1, path: '/' });

  res.setHeader('Set-Cookie', [authorizationCookie, refreshCookie]);
}

export function parseCookies(req: NextApiRequest) {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getAuthorizationCookie(req: NextApiRequest) {
  return parseCookies(req).authorization;
}

export function getRefreshCookie(req: NextApiRequest) {
  return parseCookies(req).refresh;
}
