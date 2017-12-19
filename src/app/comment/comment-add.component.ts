/**
 * Created by john on 19/05/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Comment} from "../models/comment";
import {Angular2TokenService} from "angular2-token";
import {Store} from "@ngrx/store";
import {POST_ADD_COMMENT} from "../post/post.reducer";
import {Auth} from "../auth/service/auth";
import {Router} from "@angular/router";
import {AUTH_SET_DATA} from "../auth/service/auth.reducer";
import {Post} from "../models/post";
@Component({
  selector: 'comment-add',
  templateUrl: 'comment-add.component.html'
})
export class CommentAddComponent {

  @Input('blockId')
  private blockId: string;
  @Input('postId')
  private postId: string;
  @Output()
  complete: EventEmitter<any> = new EventEmitter();

  private toggleCommentAdd: boolean = false;

  public comment: Comment = new Comment();

  public auth: Auth;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<Post>, private _router: Router) {
    this._store.select<Auth>('auth').subscribe( (auth) => this.auth = auth);
  }

  private commentButtonClicked(): void {
    console.log('PostSubBlockComponent commentButtonClicked');
    this.toggleCommentAdd = !this.toggleCommentAdd;
  }

  public addCommentButtonClicked(): void {
    this.comment.post_id = this.postId;
    this.comment.block_id = this.blockId;

    this._tokenService.post('comments', this.comment).subscribe(
      (res) => {
        this._store.dispatch({type: POST_ADD_COMMENT, payload: res.json()});
        this.complete.emit();
      }, (error) => {
        console.log('CommentAddComponent addCommentButtonClicked');
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
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  private googleButtonClicked() : void {
    this._tokenService.signInOAuth('google').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

}
