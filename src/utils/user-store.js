import store from 'store';

export function getUser() {
  store.get('tmc.user');
}

export function setUser(user) {
  store.set('tmc.user', user);
}

export function removeUser() {
  store.remove('tmc.user');
}
