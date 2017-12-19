/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { AppState } from './app.service';
import {Angular2TokenService} from 'angular2-token';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {UserState} from "./user.state";
import {AUTH_SET_DATA, AUTH_RESET_DATA} from "./auth/service/auth.reducer";
import {Auth} from "./auth/service/auth";
import {Post} from "./models/post";

import * as log from 'loglevel';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/icon64.png';
  public url = '/';
  public auth : Auth;
  public second : Observable<any>;
  public links = {
    profile: ['profiles', this.auth]
  };

  public tokenServiceParams = {
    apiBase: `http://${window.location.hostname}:3001`,
    apiPath: 'api',
    signInStoredUrlStorageKey: 'signInStoredUrlStorageKey',
    signInRedirect: 'auth/login',
    signOutFailedValidate: true,
    resetPasswordCallback: `${API_URL}/auth/resetPassword`,
    oAuthBase: `${API_URL}/api`,
    oAuthPaths: {
      github: 'auth/github',
      google: 'auth/google_oauth2',
      exaka: 'auth/exaka'
    },
  };

  constructor(public _tokenService: Angular2TokenService, public _store: Store<Auth>, public _router: Router) {}

  public ngOnInit(): void {
    this._tokenService.init(this.tokenServiceParams);

    const store = this._store.select<Auth>('auth');
    store.subscribe((obj) => {
      if(obj) {
        this.links = {profile: ['profiles', obj._id]};
        this.auth = obj;
      }
    });

    if(this._tokenService.userSignedIn()) {
      this._tokenService.validateToken().subscribe(
        (res) => {
          this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data} );
        }, (error) => {
          log.info("AppComponent constructor validateToken error");
          this._router.navigateByUrl('/');
        }
      );
    }
  }

  public signOut(): void {
    this._tokenService.signOut().subscribe(
      (res) => {
        this._store.dispatch(({type: AUTH_RESET_DATA}));
        // window.location.reload();
      }, (error) => {
        log.info('AppComponent signOut error');
        this._router.navigateByUrl('/');
      }
    )
  }

}
