/**
 * Created by john on 14/05/2017.
 */

import {Block} from "./block";

export class SubBlock extends Block {

  public selecting_post_id: string;
  public selected: boolean = false;

  public note: string;

  constructor(args = null) {
    super(args);
    if(args) {
      this.selecting_post_id = args.selecting_post_id;
      this.selected = args.selected;
    }
  }

  update(args = null): void {
    super.update(args);
    if(args) {
      if(args.selecting_post_id != null)
        this.selecting_post_id = args.selecting_post_id;
      if(args.selected != null)
        this.selected = args.selected;
    }
  }

}
