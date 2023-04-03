// @ts-check
/* eslint-disable prefer-object-spread, prefer-template */ // saves >10kB minified
import { getUser } from './user-store';
/** @typedef {RequestInit & { accessToken?: string }} RequestOptions */
/**
 * @class Api
 */
var Api = /** @class */ (function () {
    /** @param{string} oAuthSite */
    function Api(oAuthSite) {
        this.oauthSite = oAuthSite;
    }
    /**
     * @param{string} path
     * @param{RequestOptions} [options]
     */
    Api.prototype.request = function (path, options) {
        if (options === void 0) { options = {}; }
        var headers = options.headers || {};
        var user = getUser();
        if ((user && user.accessToken) || options.accessToken) {
            var token = (user && user.accessToken) || options.accessToken;
            headers = Object.assign({
                authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }, headers);
        }
        return fetch(new Request(this.oauthSite + path, Object.assign({ mode: 'cors' }, options, { headers: headers }))).then(function (response) { return (response.ok ? Promise.resolve(response) : Promise.reject(response)); });
    };
    /**
     * @param {string} path
     * @param {RequestOptions} [options]
     */
    Api.prototype.post = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request(path, Object.assign({}, options, { method: 'POST' }));
    };
    /**
     * @param {string} path
     * @param {RequestOptions} options
     */
    Api.prototype.get = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request(path, Object.assign({}, options, { method: 'GET' }));
    };
    return Api;
}());
export default Api;
