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
    sqlHost: strOrDefault(process.env.SQL_RISIBLE_DB_INSTANCE_IP),
    sqlUser: strOrDefault(process.env.SQL_RISIBLE_DB_INSTANCE_USERNAME),
    sqlDatabase: strOrDefault(process.env.SQL_RISIBLE_DB),
    sqlPort: strOrDefault(process.env.SQL_RISIBLE_DB_INSTANCE_PORT),
    sqlPassword: strOrDefault(process.env.SQL_RISIBLE_DB_INSTANCE_PASSWORD),
  };
}
