/**
 * Created by john on 23/04/2017.
 */

import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {Angular2TokenService} from "angular2-token";

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
  constructor(private _tokenService: Angular2TokenService) {}

  canActivate() {
    return !this._tokenService.userSignedIn();
  }
}
