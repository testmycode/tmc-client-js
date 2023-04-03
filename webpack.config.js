// @ts-check
const path = require('path');

const { resolve } = path;
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {ESLintPlugin.Options} */
const eslintPluginOptions = {
  exclude: ['node_modules', 'dist'],
};

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
const baseConfig = (env) => ({
  entry: './src/index.js',
  resolve: {
    modules: ['./src', './node_modules'],
    extensions: ['', '.js'],
  },
  optimization: {
    minimize: Boolean(env.prod),
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: env.prod ? undefined : [new ESLintPlugin(eslintPluginOptions)],
  devtool: 'source-map',
});

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
const commonJSConfig = (env) => Object.assign(
  {},
  baseConfig(env),
  {
    target: ['node'],
    output: {
      path: resolve('./dist'),
      filename: 'tmc-client.common' + (env.dev ? '.dev' : '') + '.js',
      library: {
        type: 'commonjs-static',
      },
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: '3.6',
                  targets: {
                    node: 14,
                  },
                }],
              ],
              plugins: [['@babel/plugin-transform-runtime', { corejs: false }]],
            },
          },
        },
      ],
    },
  },
);

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
const browserConfig = (env) => Object.assign(
  {},
  baseConfig(env),
  {
    target: ['web', 'es5'],
    output: {
      path: resolve('./dist'),
      filename: 'tmc-client' + (env.prod ? '.min.js' : '.js'),
      library: {
        name: 'TMCClient',
        type: 'umd',
      },
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.6' }],
              ],
              plugins: [['@babel/plugin-transform-runtime', { corejs: false }]],
            },
          },
        },
      ],
    },
  },
);

/**
 * @param {*} env
 * @returns {import('webpack').Configuration[]}
*/
module.exports = (env) => [commonJSConfig(env), browserConfig(env)];
