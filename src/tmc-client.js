import Api from './utils/api';
import { getUser, setUser, removeUser } from './utils/user-store';

class TmcClient {
  constructor(clientId, clientSecret, oAuthSite = 'https://tmc.mooc.fi') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.api = new Api(oAuthSite);
  }

  authenticate({ username, password }) {
    const body = [
      `client_id=${this.clientId}`,
      `client_secret=${this.clientSecret}`,
      `username=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password)}`,
      'grant_type=password',
    ].join('&');

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    return this.api.post('/oauth/token', options)
      .then(response => response.json())
      .then(response => {
        const user = { username, accessToken: response.access_token };

        setUser(user);

        return user;
      });
  }

  unauthenticate() {
    removeUser();

    return this;
  }

  getUser() {
    return getUser();
  }
}

export default TmcClient;
