/**
 * Created by john on 18/06/2017.
 */

import {Component, OnDestroy, OnInit} from "@angular/core";
import {SubBlock} from "../../../models/sub-block";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {Angular2TokenService} from "angular2-token";
import {Store, select} from "@ngrx/store";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile-activity-answers',
  templateUrl: './profile-activity-answers.component.html',
  styleUrls: [
    './profile-activity-answers.component.scss'
  ],
})
export class ProfileActivityAnswersComponent implements OnInit, OnDestroy {
  private profile: User;

  public subBlocks: SubBlock[] = [];

  private sort_by: string = 'vote';
  private sort_direction: number = -1;
  public page: number = 1;
  public per_page: number = 20;
  public count: number = 0;

  private subscription: Subscription;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<User>) {
  }


  public ngOnInit(): void {
    this.subscription = this._store.pipe(select<User, User>('profile')).subscribe(
      (profile) => {
        this.profile = profile;
        this.getPostData();
      }
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    };
    this._tokenService.get('profiles/posts/answers', {search: params}).subscribe(
      (res) => {
        this.subBlocks = [];
        const subBlockObjs = res.json().data;
        subBlockObjs.forEach((subBlockObj) => this.subBlocks.push(new SubBlock(subBlockObj)));
        this.count = res.json().count;
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

  public pageChangeEvent($event): void {
    console.log('ProfileActivityQuestionsComponent pageChangeEvent');
    this.page = $event;
    if(this.profile)
      this.getPostData();
  }
}
