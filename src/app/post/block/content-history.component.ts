import {Input, Component, OnInit} from "@angular/core";
import {ContentHistory} from "../../models/content-history";

/**
 * Created by john on 04/06/2017.
 */


@Component({
  selector: 'content-history',
  templateUrl: './content-history.component.html',
})
export class ContentHistoryComponent implements OnInit {
  @Input('currContentHistory')
  currContentHistory: ContentHistory;

  @Input('prevContentHistory')
  prevContentHistory: ContentHistory;

  private diffWordsList:Array<any> = [];

  @Input('toggled')
  public toggled: boolean = false;

  private removedCount: number = 0;
  private addedCount: number = 0;

  constructor() {
  }

  ngOnInit() {
    if(this.currContentHistory && this.prevContentHistory) {
      this.diffWordsList.forEach((diffWord) => {
        if(diffWord.added)
          this.addedCount += diffWord.count;
        if(diffWord.removed)
          this.removedCount += diffWord.count;
      })
    }
  }

  public toggleButtonClicked(): void {
    this.toggled = !this.toggled;
  }

}
