try {
  /* eslint-disable global-require */
  require('fetch-polyfill');
  require('babel-polyfill');
  /* eslint-enable global-require */
} catch (e) {

}

import TmcClient from './tmc-client';

export default TmcClient;
