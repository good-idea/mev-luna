const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const dotenv = require('dotenv');
const packageJson = require('./package.json');

module.exports = withPlugins([withSourceMaps], {
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
