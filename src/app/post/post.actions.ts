/**
 * Created by john on 03/02/2018.
 */

import {Action} from "@ngrx/store";
export enum PostActionTypes {
  POST_SET_DATA = 'POST_SET_DATA',
  POST_MERGE_DATA = 'POST_MERGE_DATA',
  POST_ADD_SUBBLOCK = 'POST_ADD_SUBBLOCK',
  POST_UPDATE_SUBBLOCK = 'POST_UPDATE_SUBBLOCK',
  POST_MERGE_SUBBLOCK = 'POST_MERGE_SUBBLOCK',
  POST_MERGE_MAINBLOCK = 'POST_MERGE_MAINBLOCK',
  POST_ADD_COMMENT = 'POST_ADD_COMMENT',
  POST_RESET = 'POST_RESET',
}

export class PostSetData implements Action {
  readonly type = PostActionTypes.POST_SET_DATA;
  constructor(public payload: any = {}) {}
}

export class PostMergeData implements Action {
  readonly type = PostActionTypes.POST_MERGE_DATA;
  constructor(public payload: any = {}) {}
}

export class PostAddSubblock implements Action {
  readonly type = PostActionTypes.POST_ADD_SUBBLOCK;
  constructor(public payload: any = {}) {}
}

export class PostUpdateSubblock implements Action {
  readonly type = PostActionTypes.POST_UPDATE_SUBBLOCK;
  constructor(public payload: any = {}) {}
}

export class PostMergeSubblock implements Action {
  readonly type = PostActionTypes.POST_MERGE_SUBBLOCK;
  constructor(public payload: any = {}) {}
}

export class PostMergeMainblock implements Action {
  readonly type = PostActionTypes.POST_MERGE_MAINBLOCK;
  constructor(public payload: any = {}) {}
}

export class PostAddComment implements Action {
  readonly type = PostActionTypes.POST_ADD_COMMENT;
  constructor(public payload: any = {}) {}
}

export class PostReset implements Action {
  readonly type = PostActionTypes.POST_RESET;
}


export type PostActions = PostSetData
  | PostMergeData
  | PostAddSubblock
  | PostUpdateSubblock
  | PostMergeSubblock
  | PostMergeMainblock
  | PostAddComment
  | PostReset
  ;
