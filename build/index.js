'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

require('fetch-polyfill');

var _tmcClient = require('./tmc-client');

var _tmcClient2 = _interopRequireDefault(_tmcClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _tmcClient2.default;
module.exports = exports['default'];