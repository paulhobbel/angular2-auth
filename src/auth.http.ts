/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Request, RequestMethod, Headers, Response } from '@angular/http';

import { IAuthConfig, AuthConfig } from './auth.config';
import { TokenService } from './token.service';
import { Token } from './token.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttp {

    private config: IAuthConfig;

    constructor(options: AuthConfig, private _tokenService: TokenService, private _http: Http, private _options: RequestOptions) {
        this.config = options.getConfig();
    }

    private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
        let newOptions = defaultOpts || new RequestOptions();
        if (this.config.globalHeaders) {
            this.setGlobalHeaders(this.config.globalHeaders, providedOpts);
        }

        newOptions = newOptions.merge(new RequestOptions(providedOpts));

        return newOptions;
    }

    private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
        let options = new RequestOptions(requestArgs);
        if (additionalOptions) {
            options = options.merge(additionalOptions);
        }

        return this.request(new Request(this.mergeOptions(options, this._options)));
    }

    public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
        if (!request.headers) {
            request.headers = new Headers();
        }

        headers.forEach((header: Object) => {
            let key: string = Object.keys(header)[0];
            let headerValue: string = (header as any)[key];
            (request.headers as Headers).set(key, headerValue);
        });
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (typeof url === 'string') {
            return this.get(url, options); // Recursion: transform url from String to Request
        }

        // from this point url is always an instance of Request;
        let req: Request = url as Request;
        let token: Token = this._tokenService.getToken();
        return this.requestWithToken(req, token);
    }

    private requestWithToken(req: Request, token: Token): Observable<Response> {
        if (token.isExpired()) {
            if (!this.config.noJwtError) {
                return new Observable<Response>((obs: any) => {
                    obs.error(new Error('No JWT present or has expired'));
                });
            }
        } else {
            req.headers.set(this.config.headerName, this.config.headerPrefix + token.token);
        }

        return this._http.request(req);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: '', method: RequestMethod.Get, url: url }, options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: body, method: RequestMethod.Post, url: url }, options);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: body, method: RequestMethod.Put, url: url }, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: '', method: RequestMethod.Delete, url: url }, options);
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: body, method: RequestMethod.Patch, url: url }, options);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: '', method: RequestMethod.Head, url: url }, options);
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.requestHelper({ body: '', method: RequestMethod.Options, url: url }, options);
    }
}