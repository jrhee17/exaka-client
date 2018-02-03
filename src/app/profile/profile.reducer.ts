import {User} from "../models/user";
import {Action} from "@ngrx/store";
import {ProfileActions, ProfileActionTypes} from "./profile.actions";
/**
 * Created by john on 11/06/2017.
 */

export function profileReducer(state: User, action: ProfileActions) {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_SET_DATA: {
      const user = new User(action.payload.data);
      return user;
    }
    case ProfileActionTypes.PROFILE_RESET: {
      return new User();
    }
    default: {
      return state;
    }
  }
}
