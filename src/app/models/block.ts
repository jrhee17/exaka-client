/**
 * Created by john on 14/05/2017.
 */
import {User} from "./user";
import {Comment} from './comment'
import {Post} from "./post";
import {Auth} from "../auth/service/auth";
import {ContentHistory} from "./content-history";

export class Block {

  comments: Comment[] = [];
  content: string;
  created_at: Date;
  owner: User;
  updated_at: Date;
  _id: string;
  content_histories: ContentHistory[] = [];
  closed: boolean = false;

  post: Post;
  embedded_post: Post;

  upvoted: boolean;
  downvoted: boolean;

  post_id: string;
  owner_id: string;
  vote: number = 0;
  _type: string;

  getContent(): string {
    return this.content || '';
  }

  appendImage(imageUrl: string): void {
    if(this.content)
      this.content += `\n![](${API_URL}/${imageUrl})`;
    else
      this.content = `![](${API_URL}/${imageUrl})`;
  }

  constructor(args) {
    if(args) {
      if(args.comments) {
        args.comments.forEach((commentObj) => {
          this.comments.push(new Comment(commentObj));
        });
      }
      this.content = args.content;
      this.created_at = new Date(args.created_at);
      this.owner = new User(args.owner);
      this.updated_at = new Date(args.updated_at);
      this._id = args._id;
      this.closed = args.closed;
      this.post_id = args.post_id;
      this.vote = args.vote;
      this._type = args._type;

      this.upvoted = args.upvoted;
      this.downvoted = args.downvoted;

      if(args.content_histories) {
        args.content_histories.forEach((contentHistoryObj) => {
          this.content_histories.push(new ContentHistory(contentHistoryObj));
        });
      }

      if(args.post)
        this.post = new Post(args.post);

      if(args.embedded_post)
        this.embedded_post = new Post(args.embedded_post);

    }
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  isOwner(auth: Auth): boolean {
    if(auth && this.owner)
      return auth._id === this.owner._id;
    return false;
  }

  getCreatedAt(): string {
    if(this.created_at)
      return this.created_at.toLocaleString();
    return '';
  }

  getUpdatedAt(): string {
    if(this.updated_at)
      return this.updated_at.toLocaleString();
    return '';
  }

  getVote(): number {
    return this.vote;
  }

  update(args = {}): void {
    if(args) {
      if(args['comments'] != null) {
        this.comments = [];
        args['comments'].forEach((commentObj) => {
          this.comments.push(new Comment(commentObj));
        });
      }

      if(args['content'] != null)
        this.content = args['content'];
      if(args['created_at'] != null)
        this.created_at = new Date(args['created_at']);
      if(args['owner'] != null)
        this.owner = new User(args['owner']);
      if(args['updated_at'] != null)
        this.updated_at = new Date(args['updated_at']);
      if(args['_id'] != null)
        this._id = args['_id'];
      if(args['closed'] != null)
        this.closed = args['closed'];
      if(args['vote'] != null)
        this.vote = args['vote'];

      if(args['upvoted'] != null)
        this.upvoted = args['upvoted'];
      if(args['downvoted'] != null)
        this.downvoted = args['downvoted'];

      if(args['content_histories'] != null) {
        this.content_histories = [];
        args['content_histories'].forEach((contentHistoryObj) => {
          this.content_histories.push(new ContentHistory(contentHistoryObj));
        });
      }
    }
  }
}
