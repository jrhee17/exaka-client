/**
 * Created by john on 03/04/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routes} from './auth.routes'
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {Angular2TokenService} from "angular2-token";
import {PreventLoggedInAccess} from "./PreventLoggedInAccess";
import {EmailConfirmComponent} from "./email-confirm/email-confirm.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthModalComponent} from "./modal/auth-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    EmailConfirmComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthModalComponent,
  ],
  providers: [
    Angular2TokenService,
    PreventLoggedInAccess,
  ],
  exports: [
    AuthModalComponent,
  ],
  bootstrap: [
    AuthComponent
  ],
})
export class AuthModule {
}
