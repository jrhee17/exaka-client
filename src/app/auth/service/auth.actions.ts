/**
 * Created by john on 03/02/2018.
 */

import {Action} from "@ngrx/store";
export enum AuthActionTypes {
  AUTH_SET_DATA = 'AUTH_SET_DATA',
  AUTH_GET_DATA = 'AUTH_GET_DATA',
  AUTH_UPVOTE_BLOCK= 'AUTH_UPVOTE_BLOCK',
  AUTH_DOWNVOTE_BLOCK= 'AUTH_DOWNVOTE_BLOCK',
  AUTH_FAVORITE_BLOCK= 'AUTH_FAVORITE_BLOCK',
  AUTH_RESET_DATA= 'AUTH_RESET_DATA',
}

export class AuthSetData implements Action {
  readonly type = AuthActionTypes.AUTH_SET_DATA;
  constructor(public payload: any = {}) {}
}

export class AuthGetData implements Action {
  readonly type = AuthActionTypes.AUTH_GET_DATA;
  constructor(public payload: any = {}) {}
}

export class AuthUpvoteBlock implements Action {
  readonly type = AuthActionTypes.AUTH_UPVOTE_BLOCK;
  constructor(public payload: any = {}) {}
}

export class AuthDownvoteBlock implements Action {
  readonly type = AuthActionTypes.AUTH_DOWNVOTE_BLOCK;
  constructor(public payload: any = {}) {}
}

export class AuthFavoriteBlock implements Action {
  readonly type = AuthActionTypes.AUTH_FAVORITE_BLOCK;
  constructor(public payload: any = {}) {}
}

export class AuthResetData implements Action {
  readonly type = AuthActionTypes.AUTH_RESET_DATA;
  constructor(public payload: any = {}) {}
}

export type AuthActions = AuthSetData |
  AuthGetData |
  AuthUpvoteBlock |
  AuthDownvoteBlock |
  AuthFavoriteBlock |
  AuthResetData
;

