/**
 * Created by john on 26/03/2017.
 */

import {User} from "./user";
import {MainBlock} from "./main-block";
import {SubBlock} from "./sub-block";
import {Comment} from './comment'
import {Tag} from "./tag";
import {Auth} from "../auth/service/auth";

export class Post {

  created_at: Date;
  main_block: MainBlock = new MainBlock();
  owner: User;
  owner_id: string;
  sub_blocks: SubBlock[] = [];
  title: string;
  updated_at: Date;
  _id: string;
  tags: Tag[] = [];
  selected_block: SubBlock;
  views: number = 0;
  favorites: number = 0;

  note: string;
  selected: boolean;
  public sub_block_count: number = 0;

  constructor(obj: any = null) {
    if(obj) {
      this.created_at = new Date(obj.created_at);
      this.main_block = new MainBlock(obj.main_block);
      this.owner = new User(obj.owner);
      this.owner_id = obj.owner_id;

      if(obj.sub_blocks) {
        obj.sub_blocks.forEach((subBlockObj) => {
          this.sub_blocks.push(new SubBlock(subBlockObj))
        });
      }

      if(obj.tags) {
        obj.tags.forEach((tagObj) => {
          this.tags.push(new Tag(tagObj));
        })
      }

      this.title = obj.title;
      this.updated_at = new Date(obj.updated_at);
      this._id = obj._id;
      this.views = obj.views;
      this.favorites = obj.favorites;

      this.selected = obj.selected;

      if(obj.selected_block)
        this.selected_block = new SubBlock(obj.selected_block);

      if(obj.owner)
        this.owner = new User(obj.owner);

      this.sub_block_count = obj.sub_block_count;
    }
  }

  mergePost(args: any = {}): void {
    if(args.created_at)
      this.created_at = new Date(args.created_at);
    if(args.main_block)
      this.mergeMainBlock(args.main_block);
    if(args.owner)
      this.owner = new User(args.owner);
    if(args.owner_id)
      this.owner_id = args.owner_id;

    if(args.sub_blocks) {
      args.sub_blocks.forEach((subBlockObj) => {
        this.mergeSubBlock(subBlockObj);
      });
    }

    if(args.tags) {
      this.tags = [];
      args.tags.forEach((tagObj) => {
        this.tags.push(new Tag(tagObj));
      })
    }

    if(args.title)
      this.title = args.title;
    if(args.updated_at)
      this.updated_at = new Date(args.updated_at);
    if(args._id)
      this._id = args._id;
    if(args.views)
      this.views = args.views;
    if(args.favorites)
      this.favorites = args.favorites;
    if(args.selected)
      this.selected = args.selected;

    if(args.selected_block)
      this.selected_block = new SubBlock(args.selected_block);

    if(args.owner)
      this.owner = new User(args.owner);

    if(args.sub_block_count)
      this.sub_block_count = args.sub_block_count;
  }

  addSubBlock(subBlock: SubBlock): void {
    this.sub_blocks.push(subBlock);
  }

  addComment(comment: Comment): void {

    if(this.main_block._id === comment.block_id) {
      this.main_block.addComment(comment);
      return;
    }

    this.sub_blocks.forEach((subBlock: SubBlock) => {
      if(subBlock._id === comment.block_id) {
        subBlock.addComment(comment);
      }
    })
  }

  updateSubBlock(subBlock: SubBlock): void {

    this.sub_blocks.forEach((iter: SubBlock) => {
      if(iter._id === subBlock._id) {
        Object.assign(iter, subBlock);
      }
    })

  }

  mergeSubBlock(subBlockData = null): void {

    if(!subBlockData)
      return;

    this.sub_blocks.forEach((subBlock: SubBlock) => {
      if(subBlock._id === subBlockData._id) {
        subBlock.update(subBlockData);
      }
    })

  }

  mergeMainBlock(mainBlockData: {} = {}): void {

    if(!mainBlockData)
      return;

    this.main_block.update(mainBlockData);

  }

  isOwner(auth: Auth): boolean {
    if(auth && this.owner)
      return auth._id === this.owner._id;
    return false;
  }

  getCreatedAt(): string {
    return this.created_at.toLocaleTimeString();
  }

  getUpdatedAt(): string {
    return this.updated_at.toLocaleString();
  }

  sortSubBlocksByDate(): void {
    this.sub_blocks.sort((subBlock1: SubBlock, subBlock2: SubBlock) => {
      if (subBlock1.selecting_post_id != null)
        return -1;
      else if (subBlock2.selecting_post_id != null)
        return 1;
      else
        return subBlock1.created_at.getTime() - subBlock2.created_at.getTime();
    })
  }

  sortSubBlocks(sortFunction: (a: SubBlock, b: SubBlock) => number) : void {
    this.sub_blocks.sort(sortFunction);
  }

  private MAX_TRUNCATED_TITLE_LENGTH = 50;

  getTruncatedTitle(): string {
    if(this.title.length > this.MAX_TRUNCATED_TITLE_LENGTH)
      return this.title.slice(0, this.MAX_TRUNCATED_TITLE_LENGTH) + '...';
    return this.title;
  }
}
