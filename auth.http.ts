import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttp {
    constructor(private _http: Http) {}

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        
    }
}