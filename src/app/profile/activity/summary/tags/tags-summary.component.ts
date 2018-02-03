/**
 * Created by john on 15/06/2017.
 */
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Tag} from "../../../../models/tag";
import {Angular2TokenService} from "angular2-token";
import {User} from "../../../../models/user";
import {Store, select} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'tags-summary',
  templateUrl: './tags-summary.component.html'
})
export class TagsSummaryComponent implements OnInit, OnDestroy {

  private profile: User;

  public tags: Tag[] = [];
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
      sort_by: 'count',
      sort_direction: -1,
    };
    this._tokenService.get('profiles/posts/tags', {search: params}).subscribe(
      (res) => {
        this.tags = [];
        const tagObjs = res.json().data;
        tagObjs.forEach((tagObj) => this.tags.push(new Tag(tagObj)));
      }, (error) => {
        console.log('AnswersSummaryComponent ngOnInit');
        debugger;
      }
    )
  }

}
