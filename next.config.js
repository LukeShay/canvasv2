module.exports = (_phase, { defaultConfig }) => {
  function webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new webpack.IgnorePlugin(/\/__helpers__\//));

    config.node = { fs: 'empty', child_process: 'empty' };

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    // Important: return the modified config
    return config;
  }

  return {
    ...defaultConfig,
    webpack,
    env: {
      API_URL: process.env.API_URL,
    },
  };
};
