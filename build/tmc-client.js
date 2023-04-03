// @ts-check
/* eslint-disable prefer-template */
import Api from './utils/api';
import { getUser, setUser, removeUser } from './utils/user-store';
var TmcClient = /** @class */ (function () {
    /**
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} [oAuthSite]
     */
    function TmcClient(clientId, clientSecret, oAuthSite) {
        if (oAuthSite === void 0) { oAuthSite = 'https://tmc.mooc.fi'; }
        /** @type {string} */
        this.clientId = clientId;
        /** @type {string} */
        this.clientSecret = clientSecret;
        /** @type {import("./utils/api").default} */
        this.api = new Api(oAuthSite);
    }
    /**
     * @param {AuthenticateArgs} user
     * @returns {Promise<AuthenticatedUser>}
     */
    TmcClient.prototype.authenticate = function (_a) {
        var _this = this;
        var username = _a.username, password = _a.password;
        return new Promise(function (resolve, reject) {
            var body = [
                'client_id=' + _this.clientId,
                'client_secret=' + _this.clientSecret,
                'username=' + encodeURIComponent(username),
                'password=' + encodeURIComponent(password),
                'grant_type=password',
            ].join('&');
            /** @type {import("./utils/api").RequestOptions} */
            var options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body,
            };
            _this.api
                .post('/oauth/token', options)
                .then(function (response) { return response.json(); })
                .then(function (
            /** @type {{ access_token: string }} */
            response) {
                var user = { username: username, accessToken: response.access_token };
                if (username.indexOf('@') !== -1) {
                    _this.api
                        .get('/api/v8/users/current', {
                        accessToken: response.access_token,
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (
                    /** @type {{ username: string }} */
                    details) {
                        user.username = details.username;
                        setUser(user);
                        resolve(user);
                    });
                }
                else {
                    setUser(user);
                    resolve(user);
                }
            })
                .catch(reject);
        });
    };
    /** @this {TmcClient} */
    TmcClient.prototype.unauthenticate = function () {
        removeUser();
        return this;
    };
    // eslint-disable-next-line class-methods-use-this
    TmcClient.prototype.getUser = function () {
        return getUser();
    };
    /** @returns {Promise<AuthenticatedUserDetails>} */
    TmcClient.prototype.getUserDetails = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.api
                .get('/api/v8/users/current?show_user_fields=true')
                .then(function (res) { return res.json(); })
                .then(resolve)
                .catch(reject);
        });
    };
    return TmcClient;
}());
export default TmcClient;
/**
 * @typedef {Object} AuthenticatedUser
 * @property {string} username
 * @property {string} accessToken
 *
 * @typedef {Object} AuthenticateArgs
 * @property {string} username
 * @property {string} password
 *
 * @typedef {Object} UserField
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} html1
 * @property {string} organizational_id
 * @property {boolean} course_announcements
 *
 * @typedef {Object} ExtraFields
 *
 * @typedef {Object} AuthenticatedUserDetails
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {UserField} user_field
 * @property {ExtraFields} extra_fields
 * @property {boolean} administrator
 */
