/**
 * Created by john on 24/06/2017.
 */
import {Component, Input} from "@angular/core";
import {Angular2TokenService} from "angular2-token";

import * as moment from 'moment';
import {ScoreEventGroup} from "../../../models/score-event-group";
import {ScoreEvent} from "../../../models/score-event";

@Component({
  selector: 'reputation-block',
  templateUrl: './reputation-block.component.html',
  styleUrls: ['./reputation-block.component.scss']
})
export class ReputationBlockComponent {

  @Input('date')
  public date: Date;

  @Input('score')
  public score: number;

  @Input('profile_id')
  public profile_id: string;

  public toggled: boolean = false;
  public loading: boolean = false;

  public scoreEvents: ScoreEvent[] = [];

  constructor(private _tokenService: Angular2TokenService) {}

  public formattedDate(): string {
    const date = moment.utc(this.date);
    if (new Date().getFullYear() === date.year())
      return date.format('MMM D');
    else
      return date.format('MMM D YY');
  }

  public toggleButtonClicked(): void {
    this.toggled = !this.toggled;
    this.toggled ? this.getScoreEvents() : this.scoreEvents = [];
  }

  public getScoreEvents(): void {
    if(!this.profile_id || !this.date)
      return;

    this.loading = true;

    const params = {
      profile_id: this.profile_id,
      start_date: moment.utc(this.date).startOf('day'),
      end_date: moment.utc(this.date).add(1, 'days').startOf('day'),
    };

    this._tokenService.get('profiles/reputations/by/date', {search: params}).subscribe(
      (res) => {
        this.loading = false;
        this.scoreEvents = [];
        const dataObjs = res.json().data;
        dataObjs.forEach((dataObj) => this.scoreEvents.push(new ScoreEvent(dataObj)));
      }, (error) => {
        console.log('ReputationBlockComponent getScoreEvents');
        debugger;
      }
    );
  }

}
