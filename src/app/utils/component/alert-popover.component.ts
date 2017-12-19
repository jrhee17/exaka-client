/**
 * Created by john on 05/10/2017.
 */
import {Component, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: `alert-popover`,
  template: `
    <div>
    <div [ngbPopover]="popContent" #p="ngbPopover" triggers="manual" [placement]="placement">
      <ng-content></ng-content>
    </div>
      
      
    <ng-template #popContent>
      <div style="min-width: 250px; color: #999999;">
        <span>{{message}}</span>
      </div>
    </ng-template>

    </div>
  `
})
export class AlertPopoverComponent {

  public message: string;

  @ViewChild('p')
  public popover: NgbPopover;

  @Input('placement')
  public placement: string;

  public display(message: string): void {

    if(this.popover.isOpen()) {
      this.popover.close();
    }

    this.message = message;

    this.popover.open();

    var self = this;

    let num = 0;
    const id = setInterval(function() {
      if(num == 3) {
        clearInterval(id);
        self.popover.close();
      }
      num++;
    }, 1000);
  }

}
