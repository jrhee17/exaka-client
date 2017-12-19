/**
 * Created by john on 03/04/2017.
 */
import {Component, ViewChild} from "@angular/core";

import {Angular2TokenService, SignInData} from 'angular2-token';
import {Router} from "@angular/router";
import {AUTH_SET_DATA} from "../service/auth.reducer";
import {Store} from "@ngrx/store";
import {UserState} from "../../user.state";
import {Auth} from "../service/auth";
import {FormGroup, Form, NgForm} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  signInData: SignInData = <SignInData>{};
  @ViewChild('loginForm')
  loginForm: NgForm;
  errors: Set<string> = new Set();

  constructor(private _tokenService: Angular2TokenService,
              private _router: Router,
              private _store: Store<Auth>) {

  }

  public login(): void {
    let self = this;
    this._tokenService.signIn(Object.assign({}, this.signInData)).subscribe(
      res => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, error => {
        self.loginForm.resetForm({email: this.signInData.email});
        this.setErrorMessage(error);
      }
    );
  }

  public validate(): void {
    this._tokenService.validateToken().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }

  private isDevelopment(): boolean {
    return ENV === 'development';
  }

  private setErrorMessage(error: any): void {
    if(error && error.json()) {
      this.errors = new Set(error.json().errors);
    } else {
      this.errors = new Set(['An unknown error has occurred']);
    }
  }

  public githubButtonClicked() : void {
    this._tokenService.signInOAuth('github').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  public googleButtonClicked() : void {
    this._tokenService.signInOAuth('google').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  public exakaButtonClicked() : void {
    this._tokenService.signInOAuth('exaka').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

}
