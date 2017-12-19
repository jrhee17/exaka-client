import {Directive, OnChanges, Input, ElementRef} from "@angular/core";
import * as marked from 'marked';
/**
 * Created by john on 06/06/2017.
 */

@Directive({
  selector: '[Marked]'
})
export class MarkedDirective implements OnChanges{
  @Input('Marked')
  public input: string;

  constructor(private el: ElementRef) {
  }

  public ngOnChanges() {
    if(this.input) {
      var md = marked.setOptions({});
      this.el.nativeElement.innerHTML = md.parse(this.input);
    }
  }
}
