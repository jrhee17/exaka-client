/**
 * Created by john on 19/06/2017.
 */
export class BlockEvent {
  public action: string;
  public type: string;

  public post_id: string;
  public post_title: string;
  public created_at: Date;
  public owner_name: string;
  public block_id: string;

  constructor(obj) {
    if(obj) {
      this.action = obj.action;
      this.post_title = obj.post_title;
      this.post_id = obj.post_id;
      this.created_at = new Date(obj.created_at);
      this.owner_name = obj.owner_name;
      this.type = obj.type;
      this.block_id = obj.block_id;
    }
  }
}
