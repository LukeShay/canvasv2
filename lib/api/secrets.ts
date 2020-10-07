function strOrDefault(str?: string) {
  return str || '';
}

export function constants() {
  return {
    accessKeyId: strOrDefault(process.env.AWS_ACCESS_KEY_ID),
    authorizationExpiresIn: strOrDefault(process.env.AUTHORIZATION_EXPIRES_IN),
    authorizationSecret: strOrDefault(process.env.AUTHORIZATION_SECRET),
    awsRegion: strOrDefault(process.env.AWS_REGION),
    refreshExpiresIn: strOrDefault(process.env.REFRESH_EXPIRES_IN),
    refreshSecret: strOrDefault(process.env.REFRESH_SECRET),
    secretAccessKey: strOrDefault(process.env.AWS_SECRET_ACCESS_KEY),
    development: strOrDefault(process.env.NODE_ENV) === 'development',
  };
}
