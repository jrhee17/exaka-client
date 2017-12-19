/**
 * Created by john on 29/06/2017.
 */
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {Tag} from "../../../models/tag";
import {User} from "../../../models/user";
import {Store} from "@ngrx/store";
@Component({
  selector: 'profile-main-tags',
  templateUrl: './profile-main-tags.component.html',
})
export class ProfileMainTagsComponent implements OnInit, OnDestroy {

  public profile: User;

  public tags: Tag[] = [];

  private page: number = 1;
  private per_page: number = 5;
  private count: number = 0;
  private sort_by: string = 'score';
  private sort_direction: number = -1;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<User>) {}

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

  public ngOnDestroy(): void {

  }

}
