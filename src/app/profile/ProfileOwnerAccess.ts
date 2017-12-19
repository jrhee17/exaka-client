import {Injectable} from "@angular/core";
import {
  ActivatedRoute, Params, CanActivate, Router, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import {Store} from "@ngrx/store";
import {Auth} from "../auth/service/auth";
/**
 * Created by john on 11/06/2017.
 */

@Injectable()
export class ProfileOwnerAccess implements CanActivate {

  private auth: Auth;

  constructor(private _store: Store<Auth>, private _router: Router) {
    this._store.select<Auth>('auth').subscribe((auth) => this.auth = auth);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const param_id = state.url.split('/',3)[2];

    if(!param_id || !this.auth || param_id != this.auth._id) {
      this._router.navigateByUrl('home');
      return false;
    } else {
      return true;
    }
  }
}
