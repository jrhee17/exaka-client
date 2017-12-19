/**
 * Created by john on 26/06/2017.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
@Component({
  selector: 'profile-main',
  templateUrl: './profile-main.component.html',
})
export class ProfileMainComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public profile: User;

  constructor(private _store: Store<User>) {}

  public ngOnInit(): void {
    this.subscription = this._store.select<User>('profile').subscribe((profile) => this.profile = profile);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
