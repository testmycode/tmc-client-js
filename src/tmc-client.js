// @ts-check
/* eslint-disable prefer-template */
import Api from './utils/api';
import { getUser, setUser, removeUser } from './utils/user-store';

/**
 * @typedef {{ username: string, accessToken: string }} AuthenticatedUser
 * @typedef {{ username: string, password: string}} AuthenticateArgs
 * @typedef {{ first_name: string
               last_name: string
               html1: string
               organizational_id: string
               course_announcements: boolean
            }} UserField
 * @typedef {object} ExtraFields
 * @typedef {{ id: number
               username: string
               email: string
               user_field: UserField
               extra_fields: ExtraFields
               administrator: boolean
            }} AuthenticatedUserDetails
 */
/**
 * @class TmcClient
 */
class TmcClient {
  /**
   * @constructor
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} [oAuthSite="https://tmc.mooc.fi"]
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
