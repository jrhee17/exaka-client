import {debug} from "util";
import {Block} from "../../models/block";
/**
 * Created by john on 25/04/2017.
 */
export class Auth {
  public _id: string;
  public name: string;
  public email: string;
  public about_me: string;
  public website_link: string;
  public github_link: string;
  public profile_image: string;
  public identicon_image: string;
  public image: string;
  public upvoted_block_ids: string[] = [];
  public downvoted_block_ids: string[] = [];
  public voted_comment_ids: string[] = [];
  public reported_block_ids: string[] = [];
  public favorite_block_ids: string[] = [];
  public score: number;
  public provider: string;

  constructor (obj: any = null) {
    if(obj) {
      this._id = obj._id;
      this.name = obj.name;
      this.email = obj.email;
      this.about_me = obj.about_me;
      this.website_link = obj.website_link;
      this.github_link = obj.github_link;
      this.profile_image = obj.profile_image;
      this.identicon_image = obj.identicon_image;
      this.image = obj.image;
      this.upvoted_block_ids = obj.upvoted_block_ids;
      this.downvoted_block_ids = obj.downvoted_block_ids;
      this.voted_comment_ids = obj.voted_comment_ids;
      this.reported_block_ids = obj.reported_block_ids;
      this.favorite_block_ids = obj.favorite_block_ids;
      this.score = obj.score;
      this.provider = obj.provider;

      console.log('auth score: ' + this.score);
    }
  }

  public getImage(): string {
    return this.checkDataUri(this.image);
  }

  public getProfileImage(): string {
    return this.checkDataUri(this.profile_image);
  }

  public getIdenticonImage(): string {
    return this.checkDataUri(this.identicon_image);
  }

  public upvoted(block: Block) {
    return this.upvoted_block_ids.indexOf(block._id) != -1;
  }

  private checkDataUri(uri: string): string {
    if(!uri)
      return;
    else if(uri.startsWith('data:'))
      return uri;
    else if(uri.startsWith('http'))
      return uri;
    return `${API_URL}${uri}`;
  }

  public upvote(block_id: string): void {
    (this.upvoted_block_ids.indexOf(block_id) == -1) ?
      (this.upvoted_block_ids.push(block_id)) :
      (this.upvoted_block_ids = this.upvoted_block_ids.filter((v) => v != block_id));

    if(this.downvoted_block_ids.indexOf(block_id) != -1)
      this.downvoted_block_ids = this.downvoted_block_ids.filter((v) => v != block_id);
  }

  public downvote(block_id: string): void {
    (this.downvoted_block_ids.indexOf(block_id) == -1) ?
      (this.downvoted_block_ids.push(block_id)) :
      (this.downvoted_block_ids = this.downvoted_block_ids.filter((v) => v != block_id));

    if(this.upvoted_block_ids.indexOf(block_id) != -1)
      this.upvoted_block_ids = this.upvoted_block_ids.filter((v) => v != block_id);
  }

  public favorite(block_id: string) :void {
    (this.favorite_block_ids.indexOf(block_id) == -1) ?
      (this.favorite_block_ids.push(block_id)) :
      (this.favorite_block_ids = this.favorite_block_ids.filter((v) => v != block_id));
  }
}
