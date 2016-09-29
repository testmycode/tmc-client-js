'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;
exports.post = post;
exports.get = get;

var _userStore = require('./user-store');

var userStore = _interopRequireWildcard(_userStore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var API_ENDPOINT = 'https://tmc.mooc.fi';

function request(path) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var headers = options.headers || {};

  var user = userStore.getUser();

  if (user && user.accessToken) {
    headers = Object.assign({
      authorization: 'Bearer ' + user.accessToken
    }, headers);
  }

  return fetch(new Request('' + API_ENDPOINT + path, Object.assign({ mode: 'cors' }, options, { headers: headers }))).then(function (response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(response);
  });
}

function post(path, options) {
  return request(path, Object.assign({}, options, { method: 'POST' }));
}

function get(path, options) {
  return request(path, Object.assign({}, options, { method: 'GET' }));
}