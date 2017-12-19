/**
 * Created by john on 14/05/2017.
 */

import {SubBlock} from "./sub-block";
import {Post} from "./post";
import {Tag} from "./tag";

export class User {
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

  public percentage: number;
  public num_questions: number;
  public num_answers: number;
  public profile_views: number;

  public created_at: Date;
  public updated_at: Date;
  public last_seen_at: Date;

  public posts: Post[] = [];

  public sub_blocks: SubBlock[] = [];
  public embedded_tags: Tag[] = [];

  public daily_score: number = 0;
  public weekly_score: number = 0;
  public monthly_score: number = 0;
  public quarterly_score: number = 0;
  public yearly_score: number = 0;

  constructor(args = null) {
    if(args) {
      this._id = args._id;
      this.name = args.name;
      this.email = args.email;
      this.about_me = args.about_me;
      this.website_link = args.website_link;
      this.github_link = args.github_link;
      this.profile_image = args.profile_image;
      this.identicon_image = args.identicon_image;
      this.image = args.image;
      this.upvoted_block_ids = args.upvoted_block_ids;
      this.downvoted_block_ids = args.downvoted_block_ids;
      this.voted_comment_ids = args.voted_comment_ids;
      this.reported_block_ids = args.reported_block_ids;
      this.favorite_block_ids = args.favorite_block_ids;
      this.score = args.score;
      console.log('score: ' + args.score);

      this.percentage = args.percentage;
      this.num_questions = args.num_questions;
      this.num_answers = args.num_answers;
      this.profile_views = args.profile_views;

      if(args.created_at)
        this.created_at = new Date(args.created_at);
      if(args.updated_at)
        this.updated_at = new Date(args.updated_at);
      if(args.last_seen_at)
        this.last_seen_at = new Date(args.last_seen_at);

      if(args.sub_blocks) {
        this.sub_blocks = [];
        args.sub_blocks.forEach((subBlockObj) => {
          this.sub_blocks.push(new SubBlock(subBlockObj));
        })
      }

      if(args.posts) {
        this.posts = [];
        args.posts.forEach((postObj) => {
          this.posts.push(new Post(postObj));
        })
      }

      if(args.embedded_tags) {
        this.embedded_tags = [];
        args.embedded_tags.forEach((embeddedTagObj) => this.embedded_tags.push(new Tag(embeddedTagObj)));
      }

      this.daily_score = args.daily_score;
      this.weekly_score = args.weekly_score;
      this.monthly_score = args.monthly_score;
      this.quarterly_score = args.quarterly_score;
      this.yearly_score = args.yearly_score;
    }
  }

  public getImage(): string {
    return this.checkDataUri(this.image);
  }

  public getRoundedPercentage(): number {
    return Math.round(this.percentage * 100);
  }

  private checkDataUri(uri: string): string {
    if(!uri)
      return;
    else if(uri.startsWith('data:'))
      return uri;
    else if(uri.startsWith('http'))
      return uri;
    return `http://${window.location.hostname }:3001` + uri;
  }

  private createdSubBlockComparator = (subBlock1: SubBlock, subBlock2: SubBlock) => {
    return subBlock1.created_at.getTime() - subBlock2.created_at.getTime();
  };

  public getTopSubBlocks(): SubBlock[] {
    return this.sub_blocks.sort(this.createdSubBlockComparator).slice(0, 5);
  }

  public getTopTags(): Tag[] {
    return this.embedded_tags.sort((tag_1: Tag, tag_2: Tag) => {
      // if(tag_1.score != tag_2.score)
        return tag_1.score - tag_2.score;
    }).slice(0, 3);
  }

}
