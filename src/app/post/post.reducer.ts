import {Post} from "../models/post";
import {Comment} from "../models/comment";
import {Action} from "@ngrx/store";
import {SubBlock} from "../models/sub-block";
import {post} from "selenium-webdriver/http";
import { PostActionTypes, PostActions } from './post.actions';
/**
 * Created by john on 15/05/2017.
 */

/**  * Created by john on 25/04/2017.  */

export function postReducer(state: Post, action: PostActions) {
  switch (action.type) {
    case PostActionTypes.POST_SET_DATA: {
      const post = new Post(action.payload.data);
      return post;
    }

    case PostActionTypes.POST_MERGE_DATA: {
      state.mergePost(action.payload);
      return state;
    }

    case PostActionTypes.POST_ADD_SUBBLOCK: {
      const subBlock = new SubBlock(action.payload);
      state.addSubBlock(subBlock);
      return state;
    }

    case PostActionTypes.POST_UPDATE_SUBBLOCK: {
      const subBlock = new SubBlock(action.payload.data);
      state.updateSubBlock(subBlock);
      return state;
    }

    case PostActionTypes.POST_MERGE_SUBBLOCK: {
      state.mergeSubBlock(action.payload);
      return state;
    }

    case PostActionTypes.POST_MERGE_MAINBLOCK: {
      state.mergeMainBlock(action.payload);
      return state;
    }

    case PostActionTypes.POST_ADD_COMMENT: {
      const comment = new Comment(action.payload.data);
      state.addComment(comment);
      return state;
    }

    case PostActionTypes.POST_RESET: {
      return new Post();
    }

    default:
      return state;
  }
}
