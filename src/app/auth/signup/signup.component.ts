/**
 * Created by john on 09/04/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService, RegisterData} from "angular2-token";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {matchingPasswords} from "../utils/form-validators";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Auth} from "../service/auth";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {AuthActionTypes} from "../service/auth.actions";

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent {

  registerData: RegisterData = <RegisterData>{};
  registrationForm: FormGroup;
  errors: Set<string> = new Set();

  constructor(private _tokenService: Angular2TokenService, public fb: FormBuilder, private _router: Router,
              private _store: Store<Auth>, private slimLoadingBarService: SlimLoadingBarService) {
    this.registrationForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('.+@.+')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")])],
      passwordConfirmation: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'passwordConfirmation')})
  }

  public signup(): void {
    this.slimLoadingBarService.start();
    this._tokenService.registerAccount(Object.assign({}, this.registerData)).subscribe(
      res => {
        this.slimLoadingBarService.complete();
        this._router.navigateByUrl('auth/emailConfirm');
      }, error => {
        this.slimLoadingBarService.stop();
        this.registrationForm.reset({email: this.registerData.email});
        this.setErrorMessage(error);
      }
    );
  }

  private setErrorMessage(error: any): void {
    if(error && error._body) {
      this.errors = new Set(error.json().errors.full_messages);
    } else {
      this.errors = new Set(['An unknown error has occurred']);
    }
  }

  public githubButtonClicked() : void {
    this._tokenService.signInOAuth(
      'github'
    ).subscribe(
      (res) => {
        this._store.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        alert('An unknown error has occurred -- please contact the administrator');
      }
    );
  }

  public googleButtonClicked() : void {
    this._tokenService.signInOAuth(
      'google'
    ).subscribe(
      (res) => {
        this._store.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        alert('An unknown error has occurred -- please contact the administrator');
      }
    );
  }

  public exakaButtonClicked() : void {
    this._tokenService.signInOAuth('exaka').subscribe(
      (res) => {
        this._store.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res});
        this._router.navigateByUrl(localStorage.getItem('signInStoredUrlStorageKey') || '/');
      }, (error) => {
        console.log(error);
        alert('An unknown error has occurred -- please contact the administrator');
      }
    );
  }

  public isDevelopment(): boolean {
    return ENV === 'development';
  }

}
