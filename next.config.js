process.env.SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

function webpack(config, { webpack, isServer }) {
  if (!isServer) {
    config.resolve.alias['@sentry/node'] = '@sentry/browser';
  }

  config.plugins.push(new webpack.IgnorePlugin(/\/test\//));
  config.plugins.push(new webpack.IgnorePlugin(/\/cypress\//));

  config.node = { fs: 'empty', child_process: 'empty' };

  return config;
}

module.exports = (_phase, { defaultConfig }) => ({
  ...defaultConfig,
  webpack,
});
