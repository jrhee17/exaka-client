import {Action} from "@ngrx/store";
import {UserState} from "../../user.state";
import {Auth} from "./auth";
import {AuthActions, AuthActionTypes} from "./auth.actions";


/**  * Created by john on 25/04/2017.  */

export function authReducer(state: Auth, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.AUTH_SET_DATA: {
      const auth = new Auth(action.payload);
      return auth;
    }
    case AuthActionTypes.AUTH_GET_DATA: {
      return state;
    }

    case AuthActionTypes.AUTH_UPVOTE_BLOCK: {
      state.upvote(action.payload.data._id);
      return state;
    }

    case AuthActionTypes.AUTH_DOWNVOTE_BLOCK: {
      state.downvote(action.payload.data._id);
      return state;
    }

    case AuthActionTypes.AUTH_FAVORITE_BLOCK: {
      state.favorite(action.payload.data._id);
      return state;
    }

    case AuthActionTypes.AUTH_RESET_DATA: {
      return null;
    }

    default:
      return state;
  }
}
