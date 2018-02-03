/**
 * Created by john on 03/05/2017.
 */

import {Component} from "@angular/core";
import {Store, select} from "@ngrx/store";
import {Auth} from "../../auth/service/auth";

import {Angular2TokenService} from "angular2-token";
import {Router} from "@angular/router";
import {ModelError} from "../../models/model-error";
import {AuthActionTypes} from "../../auth/service/auth.actions";

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent {
  public tempUserData: Auth = new Auth();
  public successMessage: string;
  public modelError: ModelError;

  constructor(public _store: Store<Auth>, private _tokenService: Angular2TokenService, private _router: Router) {
    _store.pipe(select<Auth, Auth>('auth')).subscribe((res) => this.tempUserData = new Auth(res));
  }

  public canResetPassword(): boolean {
    return this.tempUserData.provider === 'email';
  }

  submit($event): void {
    $event.preventDefault();
    this.modelError = null;
    console.log('ProfileEditComponent submit(): ' + JSON.stringify(this.tempUserData));
    this._tokenService.put(`users`, this.tempUserData).subscribe(
      (res) => {
        console.log('ProfileEditComponent submit res: ' + JSON.stringify(res));
        this.successMessage = 'Profile successfully updated';
        setTimeout(() => this.successMessage = null, 2000);
        this._store.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res.json().data});
      }, (error) => {
        console.log('ProfileEditComponent submit error: ' + JSON.stringify(error));
        this.modelError = new ModelError(error.json().data);
        debugger;
      }
    );
  }

  imageUpdated($event): void {
    this.tempUserData.profile_image =  $event.data.image_file.url;
    console.log('ProfileEditComponent imageUpdated:' + JSON.stringify($event));
  }

  imageSelected($event): void {
    this.tempUserData.image =  $event.url;
    console.log('ProfileEditComponent imageSelected:' + JSON.stringify($event));
  }

  selectUploadedImage($event): void {
    this.imageUpdated($event);
    this.imageSelected({url: $event.data.image_file.url});
  }

  private signOut(): void {
    this._tokenService.signOut().subscribe(
      (res) => {
        this._router.navigate(['/']);
      }, (error) => {
        console.log('AppComponent signOut error');
        debugger;
      }
    )
  }

}
