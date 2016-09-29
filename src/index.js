try {
  require('babel-polyfill');
  require('fetch-polyfill');
} catch(e) {}

import TmcClient from './tmc-client';

export default TmcClient;
