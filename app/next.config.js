const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  webpack5: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack: (config, { isServer, buildId }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
