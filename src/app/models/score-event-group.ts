
/**
 * Created by john on 24/06/2017.
 */

import * as moment from 'moment';

export class ScoreEventGroup {
  public created_at: Date;
  public score: number;
  public avg_score: number;

  constructor(obj) {
    if(obj) {
      this.created_at = new Date(obj.created_at);
      this.score = obj.score;
      this.avg_score = obj.avg_score;
    }
  }

  public getDateString(): string {
    const date = moment.utc(this.created_at);
    if (new Date().getFullYear() === date.year())
      return date.format('MMM D');
    else
      return date.format('MMM D YY');
  }
}
