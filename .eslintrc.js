// @ts-check
/** @type {import("eslint").Linter.Config} */
const options = {
  root: true,
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '999.999',
    },
    'import/resolver': {
      webpack: {
        paths: ['src'],
        config: 'webpack.config.js',
        env: 'dev',
      },
    },
  },
  plugins: [
    'import',
  ],
  parser: '@babel/eslint-parser',
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'max-len': ['error', { code: 128 }],
    'no-underscore-dangle': 0,
  },
};

module.exports = options;
