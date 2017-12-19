/**
 * Created by john on 16/06/2017.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {Store} from "@ngrx/store";
import {Profile} from "selenium-webdriver/firefox";
import {PROFILE_RESET, PROFILE_SET_DATA} from "../profile.reducer";
import {ActivatedRoute, Params} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
@Component({
  selector: 'profile-activity',
  templateUrl: './profile-activity.component.html'
})
export class ProfileActivityComponent implements OnInit {

  public profile: User;

  constructor(private _store: Store<User>, private _activatedRoute: ActivatedRoute, private _tokenService: Angular2TokenService) {
  }

  public ngOnInit(): void {
    this._store.select<User>('profile').subscribe((profile) => this.profile = profile);
    this._activatedRoute.parent.params.subscribe((param: Params) => {
      const id = param['id'];
      this._tokenService.get(`profiles/${id}`).subscribe((res) => {
        this._store.dispatch({type: PROFILE_SET_DATA, payload: res.json()});
      })
    })
  }

}
