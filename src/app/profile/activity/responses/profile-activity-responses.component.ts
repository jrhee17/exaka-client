/**
 * Created by john on 20/06/2017.
 */
import {Component} from "@angular/core";
import {Subscription} from "rxjs";
import {BlockEvent} from "../../../models/block-event";
import {User} from "../../../models/user";
import {Angular2TokenService} from "angular2-token";
import {Store, select} from "@ngrx/store";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile-activity-responses',
  templateUrl: './profile-activity-responses.component.html',
})
export class ProfileActivityResponsesComponent {

  private profile: User;
  public events: BlockEvent[] = [];
  private subscription: Subscription;
  private url: string = 'profiles/responses';
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
        this.url = 'profiles/responses';
        break;
      case 'tab-comments':
        this.url = 'profiles/responses/comments';
        break;
      case 'tab-answers':
        this.url = 'profiles/responses/answers';
        break;
      default:
        this.url = 'profiles/responses';
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
