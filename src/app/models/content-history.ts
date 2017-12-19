import {User} from "./user";
/**
 * Created by john on 25/05/2017.
 */
export class ContentHistory {
  content: string;
  created_at: Date;
  block_id: string;
  owner_id: string;
  updated_at: Date;
  note: string;
  owner: User = new User();

  constructor(obj) {
    if(obj) {
      this.content = obj.content;
      this.created_at = new Date(obj.created_at);
      this.updated_at = new Date(obj.updated_at);
      this.block_id = obj.block_id;
      this.owner = new User(obj.owner);
      this.note = obj.note;
    }
  }

  getCreatedAt(): string {
    return this.created_at.toLocaleString();
  }
}
