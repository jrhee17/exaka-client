  /**
 * Created by john on 21/06/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {Subscription} from "rxjs";
import {Store, select} from "@ngrx/store";
import {Post} from "../../../models/post";
import {User} from "../../../models/user";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile-activity-favorites',
  templateUrl: './profile-activity-favorites.component.html'
})
export class ProfileActivityFavoritesComponent {

  private profile: User;

  public posts: Post[] = [];

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
    this._tokenService.get('profiles/favorites', {search: params}).subscribe(
      (res) => {
        this.posts = [];
        const postObjs = res.json().data;
        postObjs.forEach((postObj) => this.posts.push(new Post(postObj)));
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
