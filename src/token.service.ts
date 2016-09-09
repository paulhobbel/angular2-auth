/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable } from '@angular/core';

import { Token } from './token.model';

import { Observable } from 'rxjs';

@Injectable()
export class TokenService {

    private token: Token;
    private tokenStream: Observable<Token>;

    constructor() {
        let storageToken = localStorage.getItem('auth_token');
        if(storageToken) {
            this.token = new Token(storageToken);
        }
        this.tokenStream = new Observable<Token>((obs: any) => {
            obs.next(this.getToken());
        });
    }

    /**
     * Get the current token.
     */
    getToken() {
        return this.token;
    }

    /**
     * Returns an stream of tokens.
     */
    getTokenStream(): Observable<Token> {
        return this.tokenStream;
    }

    /**
     * Update the current token.
     */
    setToken(token: string) {
        localStorage.setItem('auth_token', token);
        this.token = new Token(token);
    }

    /**
     * Remove the current token.
     */
    removeToken() {
        localStorage.removeItem('auth_token');
        this.token = null;
    }


}