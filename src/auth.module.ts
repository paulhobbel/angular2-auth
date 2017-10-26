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
import { TokenService } from './token.service';
import { AuthHttp } from './auth.http';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
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
                    useFactory: provideAuthHttp,
                    deps: [
                        TokenService,
                        Http,
                        RequestOptions
                    ]
                }
            ]
        }
    }
}

export function provideAuthHttp(config: IAuthConfig, tokenService: TokenService, http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(config), tokenService, http, options);
}