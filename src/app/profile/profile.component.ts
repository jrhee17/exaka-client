/**
 * Created by john on 25/04/2017.
 */
import {Component, OnDestroy, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {UserState} from "../user.state";
import {Store} from "@ngrx/store";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AUTH_SET_DATA} from "../auth/service/auth.reducer";
import {Auth} from "../auth/service/auth";
import {PROFILE_SET_DATA, PROFILE_RESET} from "./profile.reducer";
import {User} from "../models/user";
import {Subscription} from "rxjs";
import {NgbTabChangeEvent, NgbTabset} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {

  public auth: Auth;
  private profile: User;
  private param_id: string;

  private authSubscription: Subscription;
  private profileSubscription: Subscription;

  constructor(private _tokenService: Angular2TokenService, public _store: Store<Auth>,
              private _activatedRoute: ActivatedRoute, private _router: Router) {
    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this.param_id = id;
      this._tokenService.get(`profiles/${id}`).subscribe(
        (res) => {
          this._store.dispatch({type: PROFILE_SET_DATA, payload: res.json()});
        }, (error) => {
          this._router.navigateByUrl('/');
          debugger;
        }
      );

    });

    if(this._tokenService.userSignedIn()) {
      this._tokenService.validateToken().subscribe(
        (res) => {
          this._store.dispatch({type: AUTH_SET_DATA, payload: res.json().data} );
        }, (error) => {
          console.log('AppComponent constructor validateToken error');
          debugger;
        }
      );
    }


    this.authSubscription = this._store.select<Auth>('auth').subscribe((auth) => this.auth = auth);
    this.profileSubscription = this._store.select<User>('profile').subscribe((profile) => this.profile = profile);
  }

  public canEditProfile(): boolean {
    if(this.auth && this.param_id && this.auth._id === this.param_id)
      return true;
    return false;
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._store.dispatch({type: PROFILE_RESET});
    this.authSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  public tabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'tab-main':
        this._router.navigate(['./main'], { relativeTo: this._activatedRoute });
        break;
      case 'tab-activity':
        this._router.navigate(['./activity'], { relativeTo: this._activatedRoute });
        break;
      case 'tab-edit':
        this._router.navigate(['./edit'], { relativeTo: this._activatedRoute });
        break;
    }
  };

}
