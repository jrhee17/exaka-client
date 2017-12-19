import {Component, Input, ViewChild} from "@angular/core";
import {MainBlock} from "../../models/main-block";
import {Tag} from "../../models/tag";
import {Store} from "@ngrx/store";
import {Auth} from "../../auth/service/auth";
import {Angular2TokenService} from "angular2-token";
import {
  AUTH_DOWNVOTE_BLOCK, AUTH_UPVOTE_BLOCK, AUTH_FAVORITE_BLOCK,
  AUTH_SET_DATA
} from "../../auth/service/auth.reducer";
import {POST_MERGE_SUBBLOCK, POST_MERGE_MAINBLOCK} from "../post.reducer";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Post} from "../../models/post";
import {AlertPopoverComponent} from "../../utils/component/alert-popover.component";

import * as log from 'loglevel';
import {LoggerService} from "../../utils/logger.service";

/**
 * Created by john on 14/05/2017.
 */

@Component({
  selector: 'post-main-block',
  templateUrl: 'post-main-block.component.html',
})
export class PostMainBlockComponent {

  @Input('mainBlock')
  mainBlock: MainBlock;

  @Input('postId')
  private postId: string;

  @Input('tags')
  tags: Tag[] = [];

  @ViewChild('upvoteAlert')
  public upvoteAlert: AlertPopoverComponent;

  @ViewChild('downvoteAlert')
  public downvoteAlert: AlertPopoverComponent;

  private auth: Auth;
  private toggleCommentAdd: boolean = false;

  constructor(private _store: Store<Post>, private _authService: AuthService, private _router: Router, private _loggerService: LoggerService) {
    _authService.getAuth().subscribe((auth) => this.auth = auth);
  }

  private commentButtonClicked(): void {
    this.toggleCommentAdd = !this.toggleCommentAdd;
  }

  private close(): void {
    this._authService.post('main_blocks/close', {block_id: this.mainBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_MAINBLOCK, payload: res.json().data});
      }, (error) => {
        console.log('PostMainBlockComponent close()');
        debugger;
      }
    )
  }

  protected upvote(): void {
    this._authService.post('main_blocks/upvote', {id: this.mainBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_MAINBLOCK, payload: res.json().data.main_block});
        this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data.auth});
      }, (error) => {
        this._loggerService.error('Upvote has failed -- this.mainBlock._id: %s error: %s', this.mainBlock._id, error);
        this.upvoteAlert.display('Upvote has failed -- please contact system admin');
      }
    )
  }

  private downvote(): void {
    this._authService .post('main_blocks/downvote', {id: this.mainBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_MAINBLOCK, payload: res.json().data.main_block});
        this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data.auth});
      }, (error) => {
        this._loggerService.error('Downvote has failed -- this.mainBlock._id: %s error: %s', this.mainBlock._id, error);
        this.downvoteAlert.display('Downvote has failed -- please contact system admin');
      }
    )
  }

  private favorite(): void {
    this._authService.post('main_blocks/favorite', {id: this.mainBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_MAINBLOCK, payload: res.json().data.main_block});
      }, (error) => {
        console.log('PostMainBlockComponent downvote');
        debugger;
      }
    )
  }

  private contentHistoryButtonClicked(): void {
    this._router.navigateByUrl(`post/history/${this.mainBlock._id}`);
  }

  private isUpVoted(): boolean {
    return this.mainBlock.upvoted;
  }

  private isDownVoted(): boolean {
    return this.mainBlock.downvoted;
  }

  private isFavorite(): boolean {
    if(this.mainBlock)
      return this.mainBlock.favorited;
    return 0;
  }

  private vote(): number {
    if(this.mainBlock)
      return this.mainBlock.vote;
    return 0;
  }

  private favoriteCount(): number {
    if(this.mainBlock)
      return this.mainBlock.favorite_count;
    return 0;
  }

}
