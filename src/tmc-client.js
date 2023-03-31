// @ts-check
import Api from './utils/api';
import { getUser, setUser, removeUser } from './utils/user-store';

class TmcClient {
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} [oAuthSite]
   */
  constructor(clientId, clientSecret, oAuthSite = 'https://tmc.mooc.fi') {
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
  authenticate({ username, password }) {
    return new Promise((resolve, reject) => {
      const body = [
        'client_id=' + this.clientId,
        'client_secret=' + this.clientSecret,
        'username=' + encodeURIComponent(username),
        'password=' + encodeURIComponent(password),
        'grant_type=password',
      ].join('&');

      /** @type {import("./utils/api").RequestOptions} */
      const options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      };

      this.api
        .post('/oauth/token', options)
        .then((response) => response.json())
        .then((
          /** @type {{ access_token: string }} */
          response,
        ) => {
          const user = { username, accessToken: response.access_token };
          if (username.indexOf('@') !== -1) {
            this.api
              .get('/api/v8/users/current', {
                accessToken: response.access_token,
              })
              .then((res) => res.json())
              .then((
                /** @type {{ username: string }} */
                details,
              ) => {
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

  /** @this {TmcClient} */
  unauthenticate() {
    removeUser();

    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  getUser() {
    return getUser();
  }

  /** @returns {Promise<AuthenticatedUserDetails>} */
  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.api
        .get('/api/v8/users/current?show_user_fields=true')
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }
}

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
