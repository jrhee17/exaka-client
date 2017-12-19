/**
 * Created by john on 14/05/2017.
 */

import {Block} from "./block";
import {Tag} from "./tag";
import {User} from "./user";

export class MainBlock extends Block{

  private favorite: number = 0;
  favorite_user_ids: string[] = [];
  favorite_users: User[] = [];
  favorited: boolean = false;
  favorite_count: number = 0;

  constructor(args = null) {
    super(args);

    if(args) {
      this.favorite = args['favorite'];
      this.favorite_user_ids = args['favorite_user_ids'];
      this.favorited = args['favorited'];
      this.favorite_count = args['favorite_count'];

      if(args['favorite_users'] != null) {
        this.favorite_users = [];
        args['favorite_users'].forEach((userObj) => {
          this.favorite_users.push(new User(userObj));
        })
      }
    }
  }

  update(args = null): void {
    super.update(args);
    if(args) {
      if(args.favorite != null)
        this.favorite = args.favorite;
      if(args.favorite_user_ids != null)
        this.favorite_user_ids = args.favorite_user_ids;
      if(args.favorite_users != null) {
        this.favorite_users = [];
        args.favorite_users.forEach((userObj) => {
          this.favorite_users.push(new User(userObj));
        })
      }

      if(args.favorited != null)
        this.favorited = args['favorited'];
      if(args.favorite_count != null)
        this.favorite_count = args['favorite_count'];
    }
  }

}
