/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable } from '@angular/core';

import { Token } from './token.model';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {

    private _token: BehaviorSubject<Token>;

    constructor() {
        this._token = <BehaviorSubject<Token>>new BehaviorSubject(new Token(localStorage.getItem('auth_token')));
    }

    /**
     * Get the current token.
     */
    getToken(): Token {
        return this._token.getValue();
    }

    /**
     * Returns an stream of tokens.
     */
    getTokenStream(): Observable<Token> {
        return this._token.asObservable();
    }

    /**
     * Update the current token.
     */
    setToken(token: string) {
        this._token.next(new Token(token));
        localStorage.setItem('auth_token', token);
    }

    /**
     * Remove the current token.
     */
    removeToken() {
        this._token.next(null);
        localStorage.removeItem('auth_token');
    }


}