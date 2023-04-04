/** @returns {import("../tmc-client").AuthenticatedUser=} */
export function getUser(): import("../tmc-client").AuthenticatedUser | undefined;
/** @param {import("../tmc-client").AuthenticatedUser} user */
export function setUser(user: import("../tmc-client").AuthenticatedUser): void;
export function removeUser(): void;
