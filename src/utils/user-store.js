// @ts-check
import store from 'store';

/** @returns {import("../tmc-client").AuthenticatedUser=} */
export function getUser() {
  return store.get('tmc.user');
}

/** @param {import("../tmc-client").AuthenticatedUser} user */
export function setUser(user) {
  store.set('tmc.user', user);
}

export function removeUser() {
  store.remove('tmc.user');
}
