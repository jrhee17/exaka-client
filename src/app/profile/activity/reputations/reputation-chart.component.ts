/**
 * Created by john on 25/06/2017.
 */

import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {ScoreEvent} from "../../../models/score-event";
import {ScoreEventGroup} from "../../../models/score-event-group";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'reputation-chart',
  templateUrl: './reputation-chart.component.html',
})
export class ReputationChartComponent implements OnInit {
// lineChart
  public lineChartData:Array<any> = [
    {}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  @Input('profile_id')
  public profile_id: string;

  @Input('eventGroups')
  private eventGroups: ScoreEventGroup[] = [];

  private loading: boolean = false;

  private per_page: number = 20;
  private page: number = 1;
  private count: number = 0;
  private url: string = 'profiles/reputations';

  public isDataAvailable: boolean = false;

  constructor (private _tokenService: Angular2TokenService) {}

  public ngOnInit(): void {

    const data = this.eventGroups.map((eventGroup) => eventGroup.avg_score);
    const labels = this.eventGroups.map((eventGroup) => eventGroup.getDateString());

    this.lineChartData[0].data = data;
    this.lineChartLabels = labels;
    this.isDataAvailable = true;
  }

  public getDateRange(): string {
    if(this.eventGroups.length == 0)
      return '';

    const firstEventGroup = this.eventGroups[0];
    const lastEventGroup = this.eventGroups[this.eventGroups.length - 1];

    return firstEventGroup.getDateString() + ' - ' + lastEventGroup.getDateString();
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
