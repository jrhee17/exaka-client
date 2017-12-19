import {Post} from "../models/post";
import {Comment} from "../models/comment";
import {Action} from "@ngrx/store";
import {SubBlock} from "../models/sub-block";
import {post} from "selenium-webdriver/http";
/**
 * Created by john on 15/05/2017.
 */

export const POST_SET_DATA = 'POST_SET_DATA';
export const POST_MERGE_DATA = 'POST_MERGE_DATA';
export const POST_ADD_SUBBLOCK = 'POST_ADD_SUBBLOCK';
export const POST_UPDATE_SUBBLOCK = 'POST_UPDATE_SUBBLOCK';
export const POST_MERGE_SUBBLOCK = 'POST_MERGE_SUBBLOCK';
export const POST_MERGE_MAINBLOCK = 'POST_MERGE_MAINBLOCK';
export const POST_ADD_COMMENT = 'POST_ADD_COMMENT';
export const POST_RESET = 'POST_RESET';
/**  * Created by john on 25/04/2017.  */

export function postReducer(state: Post, action: Action) {
  switch (action.type) {
    case POST_SET_DATA: {
      const post = new Post(action.payload.data);
      return post;
    }

    case POST_MERGE_DATA: {
      state.mergePost(action.payload);
      return state;
    }

    case POST_ADD_SUBBLOCK: {
      const subBlock = new SubBlock(action.payload);
      state.addSubBlock(subBlock);
      return state;
    }

    case POST_UPDATE_SUBBLOCK: {
      const subBlock = new SubBlock(action.payload.data);
      state.updateSubBlock(subBlock);
      return state;
    }

    case POST_MERGE_SUBBLOCK: {
      state.mergeSubBlock(action.payload);
      return state;
    }

    case POST_MERGE_MAINBLOCK: {
      state.mergeMainBlock(action.payload);
      return state;
    }

    case POST_ADD_COMMENT: {
      const comment = new Comment(action.payload.data);
      state.addComment(comment);
      return state;
    }

    case POST_RESET: {
      return new Post();
    }

    default:
      return state;
  }
}
