import { Injectable } from '@angular/core';

import { Token } from './token.model';

@Injectable()
export class TokenService {

    private token: Token;

    constructor() {
        let storageToken = localStorage.getItem('auth_token');
        if(storageToken) {
            this.token = new Token(storageToken);
        }
    }

    /**
     * Get the current token.
     */
    getToken() {
        return this.token;
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