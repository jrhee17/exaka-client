/**
 * Created by john on 09/05/2017.
 */

import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Angular2TokenService, ResetPasswordData} from "angular2-token";
import { Location } from '@angular/common';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent {

  public forgotPasswordForm: FormGroup;
  public resetPasswordData: ResetPasswordData = <ResetPasswordData>{};

  public success: boolean = false;
  public errors: Array<string>;

  constructor(private _formBuilder: FormBuilder, private _tokenService: Angular2TokenService, private _location: Location) {
    this.forgotPasswordForm = _formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('.+@.+')])],
    });
  }

  public forgotPasswordButtonClicked() : void {
    this._tokenService.resetPassword(this.resetPasswordData).subscribe(
      (res) => {
        this.errors = null;
        this.success = true;

      }, (error) => {
        console.log('ForgotPasswordComponent forgotPasswordButtonClicked: ' + JSON.stringify(error));
        this.errors = error.json().errors;
        this.success = false;

        debugger;
      }
    )
  }

  public returnButtonClicked() {
    this._location.back();
  }
}
