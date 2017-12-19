import {User} from "../models/user";
import {Action} from "@ngrx/store";
/**
 * Created by john on 11/06/2017.
 */

export const PROFILE_SET_DATA = 'PROFILE_SET_DATA';
export const PROFILE_RESET = 'PROFILE_RESET';

export function profileReducer(state: User, action: Action) {
  switch (action.type) {
    case PROFILE_SET_DATA: {
      const user = new User(action.payload.data);
      return user;
    }
    case PROFILE_RESET: {
      return new User();
    }
    default: {
      return state;
    }
  }
}
