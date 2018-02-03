/**
 * Created by john on 21/06/2017.
 */
import {Component} from "@angular/core";
import {Subscription} from "rxjs";
import {BlockEvent} from "../../../models/block-event";
import {User} from "../../../models/user";
import {Store, select} from "@ngrx/store";
import {Angular2TokenService} from "angular2-token";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile-activity-votes',
  templateUrl: './profile-activity-votes.component.html'
})
export class ProfileActivityVotesComponent {
  private profile: User;
  public events: BlockEvent[] = [];
  private subscription: Subscription;
  private url: string = 'profiles/events/votes';
  public per_page: number = 20;
  public page: number = 1;
  public count: number = 0;

  constructor(private _store: Store<User>, private _tokenService: Angular2TokenService){}

  public ngOnInit(): void {
    this.subscription = this._store.pipe(select<User, User>('profile')).subscribe((profile) => {
      this.profile = profile;
      this.getEventData();
    });
  }

  private getEventData(): void {
    if(!this.profile || !this.profile._id)
      return;

    const params = {
      profile_id: this.profile._id,
      page: this.page,
      per_page: this.per_page,
    };

    this._tokenService.get(this.url, {search: params}).subscribe(
      (res) => {
        this.events = [];
        const eventObjs = res.json().data;
        eventObjs.forEach((eventObj) => this.events.push(new BlockEvent(eventObj)));
        this.count = res.json().count;
      }, (error) => {
        console.log('ProfileActivityActionsComponent getEventData');
        debugger;
      }
    )
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public tabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'tab-all':
        this.url = 'profiles/events/votes';
        break;
      case 'tab-upvote':
        this.url = 'profiles/events/votes/upvotes';
        break;
      case 'tab-downvote':
        this.url = 'profiles/events/votes/downvotes';
        break;
      default:
        this.url = 'profiles/events/votes';
    }

    this.page = 1;

    if($event.activeId != $event.nextId)
      this.getEventData();
  };

  public pageChangeEvent($event): void {
    this.page = $event;
    if(this.profile)
      this.getEventData();
  }
}
