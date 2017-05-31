import { getUser } from './user-store';

export default class Api {
  constructor(oAuthSite) {
    this.oauthSite = oAuthSite;
  }

  request(path, options = {}) {
    let headers = options.headers || {};

    const user = getUser();

    if (user && user.accessToken) {
      headers = Object.assign({
        authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      }, headers);
    }

    return fetch(new Request(`${this.oAuthSite}${path}`, Object.assign({ mode: 'cors' }, options, { headers })))
      .then(response => (response.ok ? Promise.resolve(response) : Promise.reject(response)));
  }

  post(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'POST' }));
  }

  get(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'GET' }));
  }
}
