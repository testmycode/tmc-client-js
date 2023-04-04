export default class Api {
    /** @param {string} oAuthSite */
    constructor(oAuthSite: string);
    /** @type {string} */
    oauthSite: string;
    /**
     * @param{string} path
     * @param{RequestOptions} [options]
     */
    request(path: string, options?: RequestOptions): Promise<Response>;
    /**
     * @param {string} path
     * @param {RequestOptions} [options]
     */
    post(path: string, options?: RequestOptions): Promise<Response>;
    /**
     * @param {string} path
     * @param {RequestOptions} options
     */
    get(path: string, options?: RequestOptions): Promise<Response>;
}
export type RequestOptions = RequestInit & {
    accessToken?: string;
};
