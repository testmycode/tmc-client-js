import { getUser } from './user-store';
import fetchPonyfill from 'fetch-ponyfill';
const { fetch, Request } = fetchPonyfill();

export default class Api {
  constructor(oAuthSite) {
    this.oauthSite = oAuthSite;
  }

  request(path, options = {}) {
    let headers = options.headers || {};

    const user = getUser();

    if ((user && user.accessToken) || options.accessToken) {
      let token;
      if (user && user.accessToken) {
        token = user.accessToken;
      } else {
        token = options.accessToken;
      }
      headers = Object.assign(
        {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        headers
      );
    }

    return fetch(
      new Request(
        `${this.oauthSite}${path}`,
        Object.assign({ mode: 'cors' }, options, { headers })
      )
    ).then(
      response =>
        response.ok ? Promise.resolve(response) : Promise.reject(response)
    );
  }

  post(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'POST' }));
  }

  get(path, options = {}) {
    return this.request(path, Object.assign({}, options, { method: 'GET' }));
  }
}
