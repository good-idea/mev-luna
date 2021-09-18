module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['sanity', 'app', 'repo', 'types']],
  },
};
