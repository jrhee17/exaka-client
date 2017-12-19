/**
 * Created by john on 09/05/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService, UpdatePasswordData} from "angular2-token";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {matchingPasswords} from "../../auth/utils/form-validators";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent {

  public changePasswordForm: FormGroup;
  public updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  private errors: Array<string>;
  public success: boolean = false;

  constructor(private _tokenService: Angular2TokenService, private _formBuilder: FormBuilder, private _router: Router, private _location: Location) {

    this.changePasswordForm = _formBuilder.group({
      passwordCurrent: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")])],
      passwordConfirmation: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'passwordConfirmation')});
  }

  public submitBtnClicked() : void {
    if(this.updatePasswordData.password === this.updatePasswordData.passwordCurrent) {
      this.success = false;
      this.setErrorMessage({errors: {full_messages: ['New password must be different from old password']}});
      return;
    }

    this._tokenService.updatePassword(this.updatePasswordData).subscribe(
      (res) => {
        this.success = true;
      }, (error) => {
        this.success = false;
        console.log('ProfilePasswordComponent error: ' + error);
        this.setErrorMessage(error.json());
        debugger;
      }
    )
  }

  private setErrorMessage(error: any): void {
    if(error) {
      this.errors = error.errors['full_messages'];
    }
    this.errors = this.errors || ['An unknown error has occurred'];
  }

  private returnButtonClicked() : void {
    this._location.back();
  }



}
