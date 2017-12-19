/**
 * Created by john on 19/06/2017.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Angular2TokenService} from "angular2-token";
import {User} from "../../../models/user";
import {BlockEvent} from "../../../models/block-event";
import {Subscription} from "rxjs";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'profile-activity-actions',
  templateUrl: './profile-activity-actions.component.html'
})
export class ProfileActivityActionsComponent implements OnInit, OnDestroy {

  private profile: User;
  public events: BlockEvent[] = [];
  private subscription: Subscription;
  private url: string = 'profiles/events';
  public per_page: number = 20;
  public page: number = 1;
  public count: number = 0;

  constructor(private _store: Store<User>, private _tokenService: Angular2TokenService){}

  public ngOnInit(): void {
    this.subscription = this._store.select<User>('profile').subscribe((profile) => {
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
        this.url = 'profiles/events';
        break;
      case 'tab-accepts':
        this.url = 'profiles/events/accepts';
        break;
      case 'tab-posts':
        this.url = 'profiles/events/posts';
        break;
      case 'tab-comments':
        this.url = 'profiles/events/comments';
        break;
      default:
        this.url = 'profiles/events';
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
