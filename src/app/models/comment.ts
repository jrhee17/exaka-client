/**
 * Created by john on 14/05/2017.
 */

import {User} from "./user";

export class Comment {

  block_id: string;
  content: string;
  created_at: Date;
  owner: User;
  owner_id: string;
  post_id: string;
  updated_at: Date;
  _id: string;

  constructor(args = null) {
    if(args) {
      this.block_id = args.block_id;
      this.content = args.content;
      this.created_at = new Date(args.created_at);
      this.owner = new User(args.owner);
      this.owner_id = args.owner_id;
      this.post_id = args.post_id;
      this.updated_at = new Date(args.updated_at);
      this._id = args._id;
    }
  }

  getCreatedAt(): string {
    return this.created_at.toLocaleString();
  }

  getUpdatedAt(): string {
    return this.updated_at.toLocaleString();
  }

}
