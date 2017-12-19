/**
 * Created by john on 09/05/2017.
 */

import {Component} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {Router} from "@angular/router";

@Component({
  selector: 'profile-delete',
  templateUrl: 'profile-delete.component.html',
  styleUrls: ['profile-delete.component.scss']
})
export class ProfileDeleteComponent {

  public successMessage: string;

  constructor(private _tokenService: Angular2TokenService, private _router: Router) {

  }

  public deleteButtonClicked() {
    const self = this;

    this._tokenService.deleteAccount().subscribe(
      (res) => {
        debugger;
        this.showSuccessAndRedirect();
      }, (error) => {
        console.log('ProfileDeleteComponent deleteButtonClicked: ' + JSON.stringify(error));
        debugger;
      }
    )
  }

  private showSuccessAndRedirect() {
    debugger;

    var self = this;

    let num = 0;
    const id = setInterval(function() {
      if(num == 3) {
        clearInterval(id);
        self._tokenService.signOut().subscribe(() => self._router.navigateByUrl('/'), () => self._router.navigateByUrl('/'));
      }
      self.successMessage = `Account has been successfully deleted! Redirecting in ${3 - num}`;
      num++;
    }, 1000);
  }

}
