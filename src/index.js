/**
 * @module TmcClient
 */
try {
  /* eslint-disable global-require */
  require('fetch-polyfill');
  require('unfetch/polyfill');
  /* eslint-enable global-require */
} catch (e) {
  // ignore
}

/* eslint-disable import/first */
import TmcClient from './tmc-client';

export default TmcClient;

/**
 * @exports @typedef {import('./tmc-client').AuthenticatedUser} AuthenticatedUser
 * @exports @typedef {import('./tmc-client').AuthenticatedUserDetails} AuthenticatedUserDetails
 * @exports @typedef {import('./tmc-client').AuthenticateArgs} AuthenticateArgs
 * @exports @typedef {import('./tmc-client').UserField} UserField
 * @exports @typedef {import('./tmc-client').ExtraFields} ExtraFields
 */
