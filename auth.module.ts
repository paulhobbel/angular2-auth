import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { IAuthConfig, AuthConfig } from './auth.config';
import { TokenService } from './token.service';
import { AuthHttp } from './auth.http';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    exports: [
        TokenService,
        AuthHttp
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
                    }
                }
            ]
        }
    }
}