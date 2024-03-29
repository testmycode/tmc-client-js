// @ts-check
import { getUser } from './user-store';

export default class Api {
  /** @param {string} oAuthSite */
  constructor(oAuthSite) {
    /** @type {string} */
    this.oauthSite = oAuthSite;
  }

  /**
   * @param{string} path
   * @param{RequestOptions} [options]
   */
  request(path, options = {}) {
    let headers = options.headers || {};

    const user = getUser();

    if ((user && user.accessToken) || options.accessToken) {
      const token = (user && user.accessToken) || options.accessToken;
      headers = Object.assign({
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }, headers);
    }

    return fetch(
      new Request(
        this.oauthSite + path,
        Object.assign({ mode: 'cors' }, options, { headers }),
      ),
    ).then(
      (response) => (response.ok ? Promise.resolve(response) : Promise.reject(response)),
    );
  }

  /**
   * @param {string} path
   * @param {RequestOptions} [options]
   */
  post(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'POST' }));
  }

  /**
   * @param {string} path
   * @param {RequestOptions} options
   */
  get(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'GET' }));
  }
}

/** @typedef {RequestInit & { accessToken?: string }} RequestOptions */
