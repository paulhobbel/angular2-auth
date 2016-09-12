# angular2-auth
[![npm version][ico-version]][link-npm]
[![license][ico-license]][link-npm]

Provides an angular2 auth module to handle authentication based on JWT

## Where can I use this for?
This library is useful for automatically attaching a JSON Web Token as an Authorization header when making HTTP requests in your Angular 2 Application. It has a TokenStorage Service that will store the latest Token and the Token class will add some nice helper functions in order to decode the token and to find out when it will expire.

An important thing to note: This library does not have any opinion on how you should implement your user authentication and how you receive the JWT tokens. You are completely free to do that yourself, but in most cases you will use a normal HTTP request to authenticate your users and then save the JWT token in the TokenStorage if authentication was successful.

## Instalation
```
npm install angular2-auth
```
When that is done you will have to include the `AuthModule` into your root module:
```ts
import { AuthModule } from 'angular2-auth';
...
@NgModule({
  imports: [
    ...
    AuthModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule {}
```
In the forRoot function you can specify a custom config, more about that in the [Configuration](/#configuration) section.

Now you are ready to implement the `TokenService` into your authentication service, a little example below:
```ts
import { TokenService } from 'angular2-auth';
...
@Injectable()
export class AuthService {
  constructor(private _http: Http, private _tokenService: TokenService) {}
  
  login(email: string, password: string) {
    this._http.post('/auth/login', { email: email, password: password }).subscribe(
      response => {
        ...
        this._tokenService.setToken(response.token);
        ...
      },
      error => console.error(error),
      () => console.log('login#done')
    );
  }
  
  logout() {
    this._tokenService.removeToken();
  }
  
  loggedIn() {
    let token = this._tokenService.getToken();
    
    if(token && token.token) {
      return !token.isExpired();
    }
    return false;
  }
}
```

## Sending Requests
If you want to send a request with the `Authorization` header set with the JWT token you can use the `AuthHttp` class.
```ts
import { AuthHttp } from 'angular2-auth';
...
@Component({
  ...
})
export class AppComponent {
  constructor(private _authHttp: AuthHttp) {}
  
  getThing() {
    this._authHttp.get('/get/thing')
      .subscribe(
        data => this.thing = data,
        error => console.error(error),
        () => console.log('getThing#done')
  }
}
```



[ico-version]: https://img.shields.io/npm/v/angular2-auth.svg
[ico-license]: https://img.shields.io/npm/l/angular2-auth.svg

[link-npm]: https://www.npmjs.com/package/angular2-auth
