import {Action} from "@ngrx/store";
import {UserState} from "../../user.state";
import {Auth} from "./auth";

export const AUTH_SET_DATA = 'AUTH_SET_DATA';
export const AUTH_GET_DATA = 'AUTH_GET_DATA';
export const AUTH_UPVOTE_BLOCK= 'AUTH_UPVOTE_BLOCK';
export const AUTH_DOWNVOTE_BLOCK= 'AUTH_DOWNVOTE_BLOCK';
export const AUTH_FAVORITE_BLOCK= 'AUTH_FAVORITE_BLOCK';
export const AUTH_RESET_DATA= 'AUTH_RESET_DATA';
/**  * Created by john on 25/04/2017.  */

export function authReducer(state: Auth, action: Action) {
  switch (action.type) {
    case AUTH_SET_DATA: {
      const auth = new Auth(action.payload);
      return auth;
    }
    case AUTH_GET_DATA: {
      return state;
    }

    case AUTH_UPVOTE_BLOCK: {
      state.upvote(action.payload.data._id);
      return state;
    }

    case AUTH_DOWNVOTE_BLOCK: {
      state.downvote(action.payload.data._id);
      return state;
    }

    case AUTH_FAVORITE_BLOCK: {
      state.favorite(action.payload.data._id);
      return state;
    }

    case AUTH_RESET_DATA: {
      return null;
    }

    default:
      return state;
  }
}
