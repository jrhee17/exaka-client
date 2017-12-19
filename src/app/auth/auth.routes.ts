import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {PreventLoggedInAccess} from "./PreventLoggedInAccess";
import {EmailConfirmComponent} from "./email-confirm/email-confirm.component";
import {HomeComponent} from "../home/home.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
/**
 * Created by john on 03/04/2017.
 */
export const routes = [
  { path: 'auth', children:
    [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [PreventLoggedInAccess]
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [PreventLoggedInAccess]
      },
      {
        path: 'emailConfirm',
        component: EmailConfirmComponent,
        canActivate: [PreventLoggedInAccess]
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        canActivate: [PreventLoggedInAccess]
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        canActivate: [PreventLoggedInAccess]
      },
      { path: '**', component: LoginComponent }
    ]
  },
];
