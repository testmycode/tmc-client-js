'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userStore = require('./user-store');

var _fetchPonyfill2 = require('fetch-ponyfill');

var _fetchPonyfill3 = _interopRequireDefault(_fetchPonyfill2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _fetchPonyfill = (0, _fetchPonyfill3.default)();

var fetch = _fetchPonyfill.fetch;
var Request = _fetchPonyfill.Request;

var Api = function () {
  function Api(oAuthSite) {
    _classCallCheck(this, Api);

    this.oauthSite = oAuthSite;
  }

  _createClass(Api, [{
    key: 'request',
    value: function request(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var headers = options.headers || {};

      var user = (0, _userStore.getUser)();

      if (user && user.accessToken || options.accessToken) {
        var token = void 0;
        if (user && user.accessToken) {
          token = user.accessToken;
        } else {
          token = options.accessToken;
        }
        headers = Object.assign({
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }, headers);
      }

      return fetch(new Request('' + this.oauthSite + path, Object.assign({ mode: 'cors' }, options, { headers: headers }))).then(function (response) {
        return response.ok ? Promise.resolve(response) : Promise.reject(response);
      });
    }
  }, {
    key: 'post',
    value: function post(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.request(path, Object.assign({}, options, { method: 'POST' }));
    }
  }, {
    key: 'get',
    value: function get(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.request(path, Object.assign({}, options, { method: 'GET' }));
    }
  }]);

  return Api;
}();

exports.default = Api;
module.exports = exports['default'];