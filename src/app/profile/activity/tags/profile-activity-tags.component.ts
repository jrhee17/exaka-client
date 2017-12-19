/**
 * Created by john on 18/06/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Tag} from "../../../models/tag";
import {User} from "../../../models/user";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile-activity-tags',
  templateUrl: './profile-activity-tags.component.html'
})
export class ProfileActivityTagsComponent {
  private profile: User;

  public tags: Tag[] = [];

  public page: number = 1;
  public per_page: number = 52;
  public count: number = 0;
  private sort_by: string = 'count';
  private sort_direction: number = -1;

  private subscription: Subscription;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<User>) {
  }


  public ngOnInit(): void {
    this.subscription = this._store.select<User>('profile').subscribe(
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
    this._tokenService.get('profiles/posts/tags', {search: params}).subscribe(
      (res) => {
        this.tags = [];
        const tagObjs = res.json().data;
        this.count = res.json().count;
        tagObjs.forEach((tagObj) => this.tags.push(new Tag(tagObj)));
      }, (error) => {
        console.log('AnswersSummaryComponent ngOnInit');
        debugger;
      }
    )
  }

  public pageChangeEvent($event): void {
    this.page = $event;
    if(this.profile)
      this.getPostData();
  }
}
