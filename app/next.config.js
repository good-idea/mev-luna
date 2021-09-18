const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withTranspiledModules = require('next-transpile-modules');
const withTM = withTranspiledModules(['@swell-public/shared']);
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const dotenv = require('dotenv');
const packageJson = require('./package.json');

dotenv.config();

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ORG = process.env.SENTRY_ORG;
const SENTRY_PROJECT = process.env.SENTRY_PROJECT;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST;
const MEILISEARCH_PUBLIC_KEY = process.env.MEILISEARCH_PUBLIC_KEY;
const RELEASE = packageJson.version;

module.exports = withPlugins([withSourceMaps, withTM], {
  webpack5: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  /**
   * NOTE: These environment variables will be accessible in the browser.
   * Do not put anything sensitive in here!
   */
  env: {
    SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SANITY_PROJECT_ID,
    SANITY_DATASET,
    SANITY_TOKEN,
    MEILISEARCH_PUBLIC_KEY,
    MEILISEARCH_HOST,
    RELEASE,
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
