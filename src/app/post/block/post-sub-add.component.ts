/**
 * Created by john on 15/05/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {Post} from "../../models/post";
import {Store, select} from "@ngrx/store";
import {SubBlock} from "../../models/sub-block";
import {ModelError} from "../../models/model-error";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth.service";
import {Auth} from "../../auth/service/auth";
import {PostActionTypes} from "../post.actions";
import {AuthActionTypes} from "../../auth/service/auth.actions";

@Component({
  selector: 'post-sub-add',
  templateUrl: 'post-sub-add.component.html'
})
export class PostSubAddComponent {

  public subBlock: SubBlock = new SubBlock();
  public modelError: ModelError;

  public auth: Auth;

  constructor(private _tokenService: Angular2TokenService, private _postStore: Store<Post>, private _authStore: Store<Auth>,
                      private _router: Router, private _activatedRoute: ActivatedRoute, private _authService: AuthService) {
    this._activatedRoute.parent.params.subscribe((params: Params) => this.subBlock.post_id = params['id']);
    this._authStore.pipe(select<Auth, Auth>('auth')).subscribe((auth) => this.auth = auth);
  }

  public submitButtonClicked(): void {
    this._authService.post('sub_blocks', this.subBlock).subscribe(
      (res) => {
        const subBlockData = res.json().data;
        this._postStore.dispatch({type: PostActionTypes.POST_ADD_SUBBLOCK, payload: subBlockData});
        this._router.navigate(["../../answers"], { relativeTo: this._activatedRoute, fragment: subBlockData._id });
      }, (error) => {
        console.log('PostSubAddComponent submitButtonClicked: ' + JSON.stringify(error));
        this.modelError = new ModelError(error.json().data);
        debugger;
      }
    );
  }

  private loginButtonPressed(): void {
    this._tokenService.canActivate();
    this._router.navigateByUrl('auth/login');
  }

  private signupButtonPressed(): void {
    this._tokenService.canActivate();
    this._router.navigateByUrl('auth/signup');
  }

  private githubButtonClicked() : void {
    this._tokenService.signInOAuth('github').subscribe(
      (res) => {
        this._authStore.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res});
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  private googleButtonClicked() : void {
    this._tokenService.signInOAuth('google').subscribe(
      (res) => {
        this._authStore.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res});
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  selectUploadedImage($event): void {
    this.subBlock.appendImage($event.data.image_file.url);
  }

}
