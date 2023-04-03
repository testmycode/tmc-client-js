export default TmcClient;
export type AuthenticatedUser = {
    username: string;
    accessToken: string;
};
export type AuthenticateArgs = {
    username: string;
    password: string;
};
export type UserField = {
    first_name: string;
    last_name: string;
    html1: string;
    organizational_id: string;
    course_announcements: boolean;
};
export type ExtraFields = any;
export type AuthenticatedUserDetails = {
    id: number;
    username: string;
    email: string;
    user_field: UserField;
    extra_fields: ExtraFields;
    administrator: boolean;
};
declare class TmcClient {
    /**
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} [oAuthSite]
     */
    constructor(clientId: string, clientSecret: string, oAuthSite?: string);
    /** @type {string} */
    clientId: string;
    /** @type {string} */
    clientSecret: string;
    /** @type {import("./utils/api").default} */
    api: import("./utils/api").default;
    /**
     * @param {AuthenticateArgs} args
     * @returns {Promise<AuthenticatedUser>}
     */
    authenticate(args: AuthenticateArgs): Promise<AuthenticatedUser>;
    /** @this {TmcClient} */
    unauthenticate(this: TmcClient): TmcClient;
    getUser(): AuthenticatedUser;
    /** @returns {Promise<AuthenticatedUserDetails>} */
    getUserDetails(): Promise<AuthenticatedUserDetails>;
}
