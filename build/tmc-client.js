'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('./utils/api');

var _api2 = _interopRequireDefault(_api);

var _userStore = require('./utils/user-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TmcClient = function () {
  function TmcClient(clientId, clientSecret) {
    var oAuthSite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://tmc.mooc.fi';

    _classCallCheck(this, TmcClient);

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.api = new _api2.default(oAuthSite);
  }

  _createClass(TmcClient, [{
    key: 'authenticate',
    value: function authenticate(_ref) {
      var _this = this;

      var username = _ref.username;
      var password = _ref.password;

      return new Promise(function (resolve, reject) {
        var body = ['client_id=' + _this.clientId, 'client_secret=' + _this.clientSecret, 'username=' + encodeURIComponent(username), 'password=' + encodeURIComponent(password), 'grant_type=password'].join('&');

        var options = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body
        };

        _this.api.post('/oauth/token', options).then(function (response) {
          return response.json();
        }).then(function (response) {
          var user = { username: username, accessToken: response.access_token };
          if (username.indexOf('@') !== -1) {
            _this.api.get('/api/v8/users/current', {
              accessToken: response.access_token
            }).then(function (res) {
              return res.json();
            }).then(function (details) {
              user.username = details.username;
              (0, _userStore.setUser)(user);
              resolve(user);
            });
          } else {
            (0, _userStore.setUser)(user);
            resolve(user);
          }
        }).catch(reject);
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