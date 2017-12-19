/**
 * Created by john on 29/06/2017.
 */
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Post} from "../../../models/post";
import {Angular2TokenService} from "angular2-token";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {MainBlock} from "../../../models/main-block";
import {Block} from "../../../models/block";
import {Store} from "@ngrx/store";
import {User} from "../../../models/user";
@Component({
  selector: 'profile-main-posts',
  templateUrl: './profile-main-posts.component.html',
})
export class ProfileMainPostsComponent implements OnInit {

  public profile: User;

  private sort_direction: number = -1;
  private page: number = 1;
  private per_page: number = 10;
  private count: number = 0;

  private content_type: string = 'Block';
  private sort_by: string = 'vote';

  // private posts: Post[] = [];
  public blocks: Block[] = [];

  constructor (private _tokenService: Angular2TokenService, private _store: Store<User>) {
  }

  public ngOnInit(): void {
    this._store.select<User>('profile').subscribe((profile) => {
      this.profile = profile;
      this.getPostData();
    });

  }

  private getPostData(): void {

    if(!this.profile || !this.profile._id)
      return;

    const params = {
      profile_id: this.profile._id,
      page: this.page,
      per_page: this.per_page,
      sort_by: this.sort_by,
      sort_direction: this.sort_direction,
      content_type: this.content_type,
    };
    this._tokenService.get('profiles/blocks', {search: params}).subscribe(
      (res) => {
        this.blocks = [];
        const blockObjs = res.json().data;
        blockObjs.forEach((blockObj) => this.blocks.push(new Block(blockObj)));
        this.count = res.json().count;
      }, (error) => {
        console.log('AnswersSummaryComponent ngOnInit');
        debugger;
      }
    )
  }

  public blockTypeTabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'profile-main-posts-tabs-all':
        this.content_type = 'Block';
        break;
      case 'profile-main-posts-tabs-questions':
        this.content_type = 'MainBlock';
        break;
      case 'profile-main-posts-tabs-answers':
        this.content_type = 'SubBlock';
        break;
      default:
        this.content_type = 'Block';
    }

    if($event.activeId != $event.nextId)
      this.getPostData();
  };

  public orderTypeTabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'profile-main-posts-tabs-votes':
        this.sort_by = 'vote';
        break;
      case 'profile-main-posts-tabs-newest':
        this.sort_by = 'created_at';
        break;
      default:
        this.sort_by = 'vote';
    }

    if($event.activeId != $event.nextId)
      this.getPostData();
  };

}
