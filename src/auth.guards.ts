/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { IAuthConfig, AuthConfig } from './auth.config';
import { TokenService } from './token.service';

/**
 * A simple guard that checks whether you are logged in.
 */
@Injectable()
export class LoggedInAuthGuard implements CanActivate {

    private _config: IAuthConfig;

    constructor(options: AuthConfig, private _tokenService: TokenService, private _router: Router) {
        this._config = options.getConfig();
    }

    /**
     * Checks if the user is logged in by checking 
     * the expiration date of the token.
     */
    canActivate() {
        let token = this._tokenService.getToken();

        // Sometimes we will have a token that is equal to null,
        // a quick fix for this is to check if the token is set
        // after that we can just check if its expired yes/no
        if(token && token.token) {
            return !token.isExpired();
        }

        // If the redirectUrl for this guard is set lets redirect to that url.
        let redirectUrl = this._config.guards.loggedInGuard.redirectUrl;
        if(redirectUrl) {
            this._router.navigate([redirectUrl]);
        }

        // In all other cases we are not logged in so lets return false.
        return false;
    }
}

/**
 * A simple guard that checks whether you are logged out.
 */
@Injectable()
export class LoggedOutAuthGuard implements CanActivate {

    private _config: IAuthConfig;

    constructor(options: AuthConfig, private _tokenService: TokenService, private _router: Router) {
        this._config = options.getConfig();
    }

    /**
     * Checks if the user is logged in by checking 
     * the expiration date of the token.
     */
    canActivate() {
        let token = this._tokenService.getToken();

        // Sometimes we will have a token that is equal to null,
        // a quick fix for this is to check if the token is set
        // after that we can just check if its expired yes/no
        if(token && token.token && !token.isExpired()) {
            // If the redirectUrl for this guard is set lets redirect to that url.
            let redirectUrl = this._config.guards.loggedOutGuard.redirectUrl;
            if(redirectUrl) {
                this._router.navigate([redirectUrl]);
            }

            return false;
        }


        // In all other cases we are logged out so lets return true.
        return true;
    }
}