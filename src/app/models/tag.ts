/**
 * Created by john on 21/05/2017.
 */
export class Tag {
  _id: string;
  name: string;
  count: number;
  score: number;

  public today_count: number = 0;
  public week_count: number = 0;

  constructor(obj) {
    if(obj) {
      this._id = obj._id;
      this.name = obj.name;
      this.count = obj.count;
      this.score = obj.score;

      this.today_count = obj.today_count;
      this.week_count = obj.week_count;
    }
  }
}
