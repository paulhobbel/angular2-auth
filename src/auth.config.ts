/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

export interface IAuthConfig {
    globalHeaders?: Array<Object>;
    headerName?: string;
    headerPrefix?: string;
    noJwtError?: boolean;
    noTokenScheme?: boolean;
    guards?: {
        loggedInGuard: {
            redirectUrl: string;
        },
        loggedOutGuard: {
            redirectUrl: string;
        },
    }
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
    public guards: {
        loggedInGuard: {
            redirectUrl: string;
        },
        loggedOutGuard: {
            redirectUrl: string;
        },
    }

    constructor(config: any = {}) {
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
        this.guards = {
            loggedInGuard: config.guards.loggedInGuard || { redirectUrl: null },
            loggedOutGuard: config.guards.loggedOutGuard || { redirectUrl: null }
        };
    }

    public getConfig(): IAuthConfig {
        return {
            globalHeaders: this.globalHeaders,
            headerName: this.headerName,
            headerPrefix: this.headerPrefix,
            noJwtError: this.noJwtError,
            noTokenScheme: this.noTokenScheme,
            guards: this.guards
        };
    }

}
