'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.setUser = setUser;
exports.removeUser = removeUser;

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUser() {
  return _store2.default.get('tmc.user');
}

function setUser(user) {
  _store2.default.set('tmc.user', user);
}

function removeUser() {
  _store2.default.remove('tmc.user');
}