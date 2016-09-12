/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import { IAuthConfig, AuthConfig } from './auth.config';
import { LoggedInAuthGuard, LoggedOutAuthGuard } from './auth.guards';
import { TokenService } from './token.service';
import { AuthHttp } from './auth.http';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    providers: [
        LoggedInAuthGuard,
        LoggedOutAuthGuard
    ]
})
export class AuthModule {
    static forRoot(config?: IAuthConfig): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                TokenService,
                {
                    provide: AuthHttp,
                    useFactory: (tokenService: TokenService, http: Http, options: RequestOptions) => {
                        return new AuthHttp(new AuthConfig(config), tokenService, http, options);
                    },
                    deps: [
                        TokenService,
                        Http,
                        RequestOptions
                    ]
                },
                {
                    provide: LoggedInAuthGuard,
                    useFactory: (tokenService: TokenService, router: Router) => {
                        return new LoggedInAuthGuard(new AuthConfig(config), tokenService, router);
                    },
                    deps: [
                        TokenService,
                        Router
                    ]
                },
                {
                    provide: LoggedOutAuthGuard,
                    useFactory: (tokenService: TokenService, router: Router) => {
                        return new LoggedOutAuthGuard(new AuthConfig(config), tokenService, router);
                    },
                    deps: [
                        TokenService,
                        Router
                    ]
                }
            ]
        }
    }
}