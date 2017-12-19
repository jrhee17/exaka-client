import {Component, OnInit, OnDestroy} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {ScoreEventGroup} from "../../models/score-event-group";
import {Store} from "@ngrx/store";
import {User} from "../../models/user";
import {Subscription} from "rxjs";
/**
 * Created by john on 25/06/2017.
 */

@Component({
  selector: 'reputation-mini-graph',
  templateUrl: './reputation-mini-graph.component.html'
})
export class ReputationMiniGraphComponent implements OnInit, OnDestroy {

  public lineChartData:Array<any> = [{}];
  public lineChartLabels:Array<any> = [];
  public isDataAvailable: boolean = false;
  public lineChartOptions:any = {
    responsive: true
  };

  private per_page: number = 20;
  private page: number = 1;
  private count: number = 0;
  private url: string = 'profiles/reputations';

  private eventGroups: Array<ScoreEventGroup> = [];

  private profile: User;
  private subscription: Subscription;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<User>) {}

  public ngOnInit(): void {
    this.subscription = this._store.select<User>('profile').subscribe((profile) => {
      this.profile = profile;
      this.getData();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getData(): void {

    if(!this.profile || !this.profile._id)
      return;

    this.isDataAvailable = false;

    const params = {
      profile_id: this.profile._id,
      page: this.page,
      per_page: this.per_page,
    };

    this._tokenService.get(this.url, {search: params}).subscribe(
      (res) => {
        this.eventGroups = [];
        this.lineChartData = [{}];
        this.lineChartLabels = [];

        const eventObjs = res.json().data;
        eventObjs.forEach((eventObj) => this.eventGroups.push(new ScoreEventGroup(eventObj)));

        const data = eventObjs.map((eventObj) => new ScoreEventGroup(eventObj)).map((eventGroup) => eventGroup.avg_score);
        const labels = eventObjs.map((eventObj) => new ScoreEventGroup(eventObj)).map((eventGroup) => eventGroup.getDateString());

        this.lineChartData[0].data = data;
        this.lineChartLabels = labels;
        this.count = res.json().count;
        this.isDataAvailable = true;
      }, (error) => {
        console.log('ProfileActivityActionsComponent getEventData');
        debugger;
      }
    )

  }

}
