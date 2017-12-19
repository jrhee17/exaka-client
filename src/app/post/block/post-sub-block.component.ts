import {Component, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {SubBlock} from "../../models/sub-block";
import {Auth} from "../../auth/service/auth";
import {Store} from "@ngrx/store";
import {POST_UPDATE_SUBBLOCK, POST_MERGE_SUBBLOCK, POST_SET_DATA} from "../post.reducer";
import {Angular2TokenService} from "angular2-token";
import {AUTH_UPVOTE_BLOCK, AUTH_DOWNVOTE_BLOCK, AUTH_SET_DATA} from "../../auth/service/auth.reducer";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Post} from "../../models/post";
import {AlertPopoverComponent} from "../../utils/component/alert-popover.component";
import {LoggerService} from "../../utils/logger.service";
/**
 * Created by john on 14/05/2017.
 */

@Component({
  selector: 'post-sub-block',
  templateUrl: 'post-sub-block.component.html'
})
export class PostSubBlockComponent {
  @Input('subBlock')
  public subBlock: SubBlock;

  @Input('post')
  public post: Post;

  public auth: Auth;

  @Output('select')
  private select: EventEmitter<string> = new EventEmitter();

  public toggleCommentAdd: boolean = false;

  @ViewChild('upvoteAlert')
  public upvoteAlert: AlertPopoverComponent;

  @ViewChild('downvoteAlert')
  public downvoteAlert: AlertPopoverComponent;

  constructor(private _store: Store<Auth>, private _authService: AuthService, private _router: Router, private _loggerService: LoggerService) {
    _store.select<Auth>('auth').subscribe((res) => this.auth = res);
  }

  public commentButtonClicked(): void {
    this.toggleCommentAdd = !this.toggleCommentAdd;
  }

  public upvote(): void {
    this._authService.post('sub_blocks/upvote', {id: this.subBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_SUBBLOCK, payload: res.json().data.sub_block});
        this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data.auth});
      }, (error) => {
        this._loggerService.error('Upvote has failed -- this.subBlock._id: %s error: %s', this.subBlock._id, error);
        this.upvoteAlert.display('Upvote has failed -- please contact system admin');
      }
    )
  }

  public downvote(): void {
    this._authService.post('sub_blocks/downvote', {id: this.subBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_SUBBLOCK, payload: res.json().data.sub_block});
        this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data.auth});
      }, (error) => {
        this._loggerService.error('Downvote has failed -- this.subBlock._id: %s error: %s', this.subBlock._id, error);
        this.downvoteAlert.display('Downvote has failed -- please contact system admin');
      }
    )
  }

  private close(): void {
    this._authService.post('sub_blocks/close', {closed: !this.subBlock.closed, block_id: this.subBlock._id}).subscribe(
      (res) => {
        this._store.dispatch({type: POST_MERGE_SUBBLOCK, payload: res.json()});
      }, (error) => {
        console.log('PostSubBlockComponent close()');
        debugger;
      }
    )
  }

  public selectButtonPressed(): void {
    this.select.emit(this.subBlock._id);
  }

  private contentHistoryButtonClicked(): void {
    this._router.navigateByUrl(`post/history/${this.subBlock._id}`);
  }

  public isUpVoted(): boolean {
    if(this.subBlock)
      return this.subBlock.upvoted;
    return false;
  }

  public isDownVoted(): boolean {
    if(this.subBlock)
      return this.subBlock.downvoted;
    return false;
  }

  public vote(): number {
    if(this.subBlock)
      return this.subBlock.vote;
    return 0;
  }

  public isSelected(): boolean {
    if(this.subBlock)
      return this.subBlock.selected;
    return false;
  }

}
