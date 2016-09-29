'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('./utils/api');

var _userStore = require('./utils/user-store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLIENT_ID = 'ffb9fccb2a873a9eaa56ef3d2624ddce9dff60d51cf423f52af5db020c51c580';
var CLIENT_SECRET = 'f33e39d88736beb471048f56bc86a6f8f7ede82382383cef1283fc21ab633705';

var TmcClient = function () {
  function TmcClient() {
    _classCallCheck(this, TmcClient);
  }

  _createClass(TmcClient, [{
    key: 'authenticate',
    value: function authenticate(_ref) {
      var username = _ref.username;
      var password = _ref.password;

      var body = ['client_id=' + CLIENT_ID, 'client_secret=' + CLIENT_SECRET, 'username=' + username, 'password=' + password, 'grant_type=password'].join('&');

      var options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      };

      return (0, _api.post)('/oauth/token', options).then(function (response) {
        return response.json();
      }).then(function (response) {
        var user = { username: username, accessToken: response.access_token };

        (0, _userStore.setUser)(user);

        return user;
      });
    }
  }, {
    key: 'unauthenticate',
    value: function unauthenticate() {
      (0, _userStore.removeUser)();

      return this;
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      return (0, _userStore.getUser)();
    }
  }]);

  return TmcClient;
}();

exports.default = TmcClient;
module.exports = exports['default'];