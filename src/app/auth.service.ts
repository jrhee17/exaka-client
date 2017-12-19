/**
 * Created by john on 29/05/2017.
 */
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Angular2TokenService} from "angular2-token";
import {Auth} from "./auth/service/auth";
import {AUTH_SET_DATA} from "./auth/service/auth.reducer";
import {Observable} from "rxjs";
import {RequestOptionsArgs, Response} from "@angular/http";
import {Router} from "@angular/router";

export enum AuthLevel {
  NO_LOGIN = 0,
  LOGIN = 1,
  OWNER = 2
}

@Injectable()
export class AuthService {

  private auth: Observable<Auth>;

  constructor(private _store: Store<Auth>, private _tokenService: Angular2TokenService, private _router: Router) {
    this.auth = this._store.select<Auth>('auth');
  }

  public getAuth(): Observable<Auth> {
    if (!this.auth && this._tokenService.userSignedIn()) {
      this._tokenService.validateToken().subscribe(
        (res) => {
          this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data} );
        }, (error) => {
          console.log('AppComponent constructor validateToken error');
          debugger;
        }
      )
    }

    return this.auth;
  }

  public post(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    const response: Observable<Response> = this._tokenService.post(url, body, options).
      map( (res) => {
        console.log('AuthService get res');
        return res;
      }
    ).catch(
      (error) => {
        console.log('AuthService get catch');
        if(error.status === 401) {
          this._router.navigateByUrl('auth/login');
          return Observable.empty();
        }
        return Observable.throw(error);
      }
    );

    return response;
  }

  public put(url: string, body: any, options: RequestOptionsArgs = null): Observable<Response> {
    const response: Observable<Response> = this._tokenService.put(url, body, options).
    map( (res) => {
        return res;
      }
    ).catch(
      (error) => {
        if(error.status === 401) {
          this._router.navigateByUrl('auth/login');
          return Observable.empty();
        }
        return Observable.throw(error);
      }
    );

    return response;
  }

}
