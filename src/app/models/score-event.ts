/**
 * Created by john on 24/06/2017.
 */

import * as moment from 'moment';

export class ScoreEvent {
  public action: string;
  public type: string;
  public owner_name: string;
  public created_at: Date;

  public post_id: string;
  public post_title: string;
  public score: number;
  public score_snapshot: number;

  constructor(obj) {
    if(obj) {
      this.action = obj.action;
      this.post_title = obj.post_title;
      this.post_id = obj.post_id;
      this.created_at = new Date(obj.created_at);
      this.owner_name = obj.owner_name;
      this.type = obj.type;
      this.score = obj.score;
      this.score_snapshot = obj.score_snapshot;
    }
  }

  public getTime(): string {
    return moment.utc(this.created_at).format('H m');
  }
}
