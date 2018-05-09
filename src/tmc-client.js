import Api from './utils/api';
import { getUser, setUser, removeUser } from './utils/user-store';

class TmcClient {
  constructor(clientId, clientSecret, oAuthSite = 'https://tmc.mooc.fi') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.api = new Api(oAuthSite);
  }

  authenticate({ username, password }) {
    return new Promise((resolve, reject) => {
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

      this.api
        .post('/oauth/token', options)
        .then(response => response.json())
        .then(response => {
          const user = { username, accessToken: response.access_token };
          if (username.indexOf('@') !== -1) {
            this.api
              .get('/api/v8/users/current', {
                accessToken: response.access_token,
              })
              .then(res => res.json())
              .then(details => {
                user.username = details.username;
                setUser(user);
                resolve(user);
              });
          } else {
            setUser(user);
            resolve(user);
          }
        })
        .catch(reject);
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
