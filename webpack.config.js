// @ts-check
const path = require('path');

const { resolve } = path;
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {ESLintPlugin.Options} */
const eslintPluginOptions = {
  exclude: ['node_modules', 'dist', 'build'],
};

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
module.exports = (env) => ({
  entry: './src/index.js',
  target: ['web', 'es5'],
  output: {
    path: resolve('./dist'),
    filename: `tmc-client${env.prod ? '.min.js' : '.js'}`,
    library: 'TmcClient',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
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
  resolve: {
    modules: ['./src', './node_modules'],
    extensions: ['', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: env.prod ? undefined : [new ESLintPlugin(eslintPluginOptions)],
  devtool: 'source-map',
});
