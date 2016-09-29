'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tmcClient = require('./tmc-client');

var _tmcClient2 = _interopRequireDefault(_tmcClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  require('babel-polyfill');
  require('fetch-polyfill');
} catch (e) {}

exports.default = _tmcClient2.default;
module.exports = exports['default'];