import {Component, Input} from "@angular/core";
/**
 * Created by john on 28/07/2017.
 */

@Component({
  selector: 'basic-tag',
  template: `
    <button class="exaka-tag px-2 mr-2 rounded" [routerLink]="['/tags', tag.name]">
      {{tag.name}}
    </button>
  `,
  styles: [
    `
    .exaka-tag {
      font-size: 0.8em;
      color: #7c8cb5;
      border: 1px solid #7c8cb5;
      background-color: #ffffff;
    }`,
    `
    .exaka-tag:hover {
      background-color: rgb(189, 198, 219);
      color: #ffffff;
      border: 1px solid #bdc6db;
    }
    `
  ],
})
export class BasicTagComponent {

  @Input('tag')
  public tag;

}
