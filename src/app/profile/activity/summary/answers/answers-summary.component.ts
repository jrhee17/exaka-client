import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {Angular2TokenService} from "angular2-token";

import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {SubBlock} from "../../../../models/sub-block";
import {User} from "../../../../models/user";
import {Store, select} from "@ngrx/store";
import {Subscription} from "rxjs";
/**
 * Created by john on 12/06/2017.
 */

@Component({
  selector: 'answers-summary',
  templateUrl: './answers-summary.component.html'
})
export class AnswersSummaryComponent implements OnInit, OnDestroy {

  private profile: User;

  public subBlocks: SubBlock[] = [];

  private sort_by: string = 'vote';
  private sort_direction: number = -1;
  private subscription: Subscription;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<User>) {
  }

  public ngOnInit(): void {
    this.subscription = this._store.pipe(select<User, User>('profile')).subscribe((profile) => {
      this.profile = profile;
      this.getPostData();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getPostData(): void {

    if(!this.profile || !this.profile._id)
      return;

    const params = {
      profile_id: this.profile._id,
      page: 1,
      per_page: 5,
      sort_by: this.sort_by,
      sort_direction: this.sort_direction,
    };
    this._tokenService.get('profiles/posts/answers', {search: params}).subscribe(
      (res) => {
        this.subBlocks = [];
        const subBlockObjs = res.json().data;
        subBlockObjs.forEach((subBlockObj) => this.subBlocks.push(new SubBlock(subBlockObj)));
      }, (error) => {
        console.log('AnswersSummaryComponent ngOnInit');
        debugger;
      }
    )
  }

  public tabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'tab-votes':
        this.sort_by = 'vote';
        break;
      case 'tab-activity':
        this.sort_by = 'updated_at';
        break;
      case 'tab-newest':
        this.sort_by = 'created_at';
        break;
      default:
        this.sort_by = 'vote';
    }

    if($event.activeId != $event.nextId)
      this.getPostData();
  };

}
