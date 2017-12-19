/**
 * Created by john on 09/05/2017.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ResetPasswordData, Angular2TokenService, UpdatePasswordData} from "angular2-token";
import {matchingPasswords} from "../utils/form-validators";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent {

  public updatePasswordForm: FormGroup;
  public updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  public errors: Array<string>;
  public successMessage: string;

  constructor (private _formBuilder: FormBuilder, private _tokenService: Angular2TokenService,
               private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.updatePasswordForm = _formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")])],
      passwordConfirmation: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'passwordConfirmation')})

    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.updatePasswordData.resetPasswordToken = params['token'];
    });
  }

  public updatePasswordButtonClicked() {
    this._tokenService.updatePassword(this.updatePasswordData).subscribe(
      (res) => {
        this.showSuccessAndRedirect();
      }, (error) => {
        console.log('ResetPasswordComponent resetPasswordButtonClicked: ' + JSON.stringify(error));
        if(error.status === 404) {
          this.errors = ['Unauthorized request'];
        }
        debugger;
      }
    );
  }

  public showSuccessAndRedirect() {

    var self = this;

    let num = 0;
    const id = setInterval(function() {
      if(num == 3) {
        clearInterval(id);
        self._router.navigateByUrl('/');
      }
      self.successMessage = `Account has been successfully updated! Redirecting in ${3 - num}`;
      num++;
    }, 1000);
  }

}
