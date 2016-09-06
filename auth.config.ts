export interface IAuthConfig {
    globalHeaders: Array<Object>;
    headerName: string;
    headerPrefix: string;
    noJwtError: boolean;
    noTokenScheme?: boolean;
}

/**
 * Sets up the authentication configuration.
 */

export class AuthConfig {

    public globalHeaders: Array<Object>;
    public headerName: string;
    public headerPrefix: string;
    public noJwtError: boolean;
    public noTokenScheme: boolean;

    /**
     * {
        globalHeaders: Array<Object>,
        headerName: string,
        headerPrefix: string,
        noJwtError: boolean,
        noTokenScheme?: boolean
    }
     */
    constructor(config?: IAuthConfig) {
        this.globalHeaders = config.globalHeaders || [];
        this.headerName = config.headerName || 'Authorization';
        if (config.headerPrefix) {
            this.headerPrefix = config.headerPrefix + ' ';
        } else if (config.noTokenScheme) {
            this.headerPrefix = '';
        } else {
            this.headerPrefix = 'Bearer ';
        }
        this.noJwtError = config.noJwtError || false;
        this.noTokenScheme = config.noTokenScheme || false;
    }

    public getConfig(): IAuthConfig {
        return {
            globalHeaders: this.globalHeaders,
            headerName: this.headerName,
            headerPrefix: this.headerPrefix,
            noJwtError: this.noJwtError,
            noTokenScheme: this.noTokenScheme
        };
    }

}
