/**
 * Created by john on 03/06/2017.
 */

import {Component, ViewChild, ElementRef, HostListener, Input, EventEmitter, Output} from "@angular/core";
import {AUTH_SET_DATA} from "../service/auth.reducer";
import {Angular2TokenService} from "angular2-token";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {Auth} from "../service/auth";
@Component({
  selector: 'auth-modal',
  templateUrl: 'auth-modal.component.html',
})
export class AuthModalComponent {

  @ViewChild('popover') public popover: NgbPopover;

  @Output('action')
  private action: EventEmitter<any> = new EventEmitter<any>();

  @Input('disabled')
  private disabled: boolean = false;

  constructor(private _tokenService: Angular2TokenService, private _store: Store<Auth>, private _router: Router, private _eref: ElementRef) {

  }

  public popoverClicked(event): void {
    if(this._tokenService.userSignedIn()) {
      if(!this.disabled)
        this.action.emit();
    } else {
      this.popover.open();
    }
  }

  private loginButtonPressed(): void {
    this._tokenService.canActivate();
    this._router.navigateByUrl('auth/login');
  }

  private signupButtonPressed(): void {
    this._tokenService.canActivate();
    this._router.navigateByUrl('auth/signup');
  }

  private githubButtonClicked() : void {
    this._tokenService.signInOAuth('github').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
        this.popover.close();
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  private googleButtonClicked() : void {
    this._tokenService.signInOAuth('google').subscribe(
      (res) => {
        this._store.dispatch({type: AUTH_SET_DATA, payload: res});
        this.popover.close();
      }, (error) => {
        console.log(error);
        debugger;
      }
    );
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.popover.close();
    }
  }

}
