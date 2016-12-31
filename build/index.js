'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tmcClient = require('./tmc-client');

var _tmcClient2 = _interopRequireDefault(_tmcClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  /* eslint-disable global-require */
  require('fetch-polyfill');
  require('babel-polyfill');
  /* eslint-enable global-require */
} catch (e) {
  console.warn('Could not require some of the dependencies.');
}

exports.default = _tmcClient2.default;
module.exports = exports['default'];