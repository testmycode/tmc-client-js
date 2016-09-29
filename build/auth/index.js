'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = authorize;
exports.unauthorize = unauthorize;
exports.getUser = getUser;

var _api = require('../utils/api');

var api = _interopRequireWildcard(_api);

var _userStore = require('../utils/user-store');

var userStore = _interopRequireWildcard(_userStore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var CLIENT_ID = 'ffb9fccb2a873a9eaa56ef3d2624ddce9dff60d51cf423f52af5db020c51c580';
var CLIENT_SECRET = 'f33e39d88736beb471048f56bc86a6f8f7ede82382383cef1283fc21ab633705';

function authorize(_ref) {
  var username = _ref.username;
  var password = _ref.password;

  var body = ['client_id=' + CLIENT_ID, 'client_secret=' + CLIENT_SECRET, 'username=' + username, 'password=' + password, 'grant_type=password'].join('&');

  var options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  };

  return api.post('/oauth/token', options).then(function (response) {
    var user = {
      username: username,
      accessToken: response.access_token
    };

    userStore.setUser(user);

    return user;
  });
}

function unauthorize() {
  userStore.removeUser();
}

function getUser() {
  return userStore.getUser();
}