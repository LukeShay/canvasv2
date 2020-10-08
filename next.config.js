function webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
  config.plugins.push(new webpack.IgnorePlugin(/\/test\//));
  config.plugins.push(new webpack.IgnorePlugin(/\/cypress\//));

  config.node = { fs: 'empty', child_process: 'empty' };

  return config;
}

module.exports = (_phase, { defaultConfig }) => ({
  ...defaultConfig,
  webpack,
});
