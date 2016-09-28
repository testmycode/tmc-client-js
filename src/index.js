import 'babel-polyfill';
import 'fetch-polyfill';

import * as _auth from './auth';

export const auth = _auth;

window.TmcClient = {
  auth: _auth
};
