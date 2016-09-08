/**
 * @license
 * Copyright (C) 2016 Dizzy <itsdizzy40@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

// Avoid TS error "cannot find name escape"
declare function escape(s:string): string;

export class TokenError extends Error {
    
    name = "TokenError";

    constructor(message: string) {
        super(message)
    }
}

export class Token {
    constructor(
        public token: string
    ) {}

    private decodeBase64(str: string): string {
        let output = str.replace(/-/g, '+')
                        .replace(/_/g, '/');
        switch(output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw new TokenError('Illegal base64url string!');
            }
        }

        return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output)));
    }

    private decodeToken(): any {
        let parts = this.token.split('.');

        if(parts.length !==3) {
            throw new TokenError('A JWT Token must have 3 parts!');
        }

        let decoded = this.decodeBase64(parts[1]);
        if(!decoded) {
            throw new TokenError('Cannot decode the token!');
        }

        return JSON.parse(decoded);
    }

    /**
     * Gets the expiration date of this token.
     */
    public getExpirationDate(): Date {
        let decoded = this.decodeToken();

        if(!decoded.hasOwnProperty('exp')) {
            return new Date();
        }

        let date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    /**
     * Check whether the token has been expired already.
     */
    public isExpired(offsetSeconds: number = 0): boolean {
        let date = this.getExpirationDate();

        if(date.getSeconds() === new Date().getSeconds()) {
            return false;
        }

        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }
}