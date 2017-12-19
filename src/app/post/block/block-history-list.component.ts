import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import {ContentHistory} from "../../models/content-history";
import { Location } from '@angular/common';
/**
 * Created by john on 04/06/2017.
 */

@Component({
  selector: 'block-history',
  templateUrl: './block-history-list.component.html'
})
export class BlockHistoryListComponent {

  private contentHistories: ContentHistory[] = [];
  public contentHistoryIndices: number[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _tokenService: Angular2TokenService, private _location: Location) {
    _activatedRoute.params.subscribe((params) => {
      _tokenService.get(`content_histories/by_block/${params['block_id']}`).subscribe(
        (res) => {
          this.setContentHistories(res.json().data);
        }, (error) => {
          console.log('BlockHistoryListComponent constructor');
          debugger;
        }
      )
    })
  }

  private setContentHistories(resArr: Array<ContentHistory>) {
    if(resArr) {
      resArr.forEach((res, index) => {
        this.contentHistories.push(new ContentHistory(res));
        this.contentHistoryIndices.push(index);
      })
    }
  }

  public backButtonPressed(): void {
    this._location.back();
  }

}
