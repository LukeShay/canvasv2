function strOrDefault(str?: string) {
  return str || '';
}

export function constants() {
  return {
    authorizationExpiresIn: strOrDefault(process.env.AUTHORIZATION_EXPIRES_IN),
    authorizationSecret: strOrDefault(process.env.AUTHORIZATION_SECRET),
    refreshExpiresIn: strOrDefault(process.env.REFRESH_EXPIRES_IN),
    refreshSecret: strOrDefault(process.env.REFRESH_SECRET),
    development: strOrDefault(process.env.NODE_ENV) === 'development',
  };
}
