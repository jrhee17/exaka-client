/**
 * Created by john on 03/02/2018.
 */

import {Action} from "@ngrx/store";
export enum ProfileActionTypes {
  PROFILE_SET_DATA = 'PROFILE_SET_DATA',
  PROFILE_RESET = 'PROFILE_RESET',
}

export class ProfileSetData implements Action {
  readonly type = ProfileActionTypes.PROFILE_SET_DATA;
  constructor(public payload: any = {}) {}
}

export class ProfileReset implements Action {
  readonly type = ProfileActionTypes.PROFILE_RESET;
  constructor(public payload: any = {}) {}
}

export type ProfileActions =
  ProfileSetData |
  ProfileReset
;
