/**
 * Created by john on 17/10/2017.
 */
import {Component, Input} from "@angular/core";
import {MainBlock} from "../../models/main-block";
import {Block} from "../../models/block";

@Component({
  selector: 'basic-user-badge',
  template: `
    <div class="py-2 px-3 ml-3 rounded d-flex flex-column" *ngIf="block.owner" style="border: 1px solid #d3d3d3;">
      <span style="font-size: 9pt; color: #777777;">{{ block.getCreatedAt().toLocaleString() }}</span>
      <div class="d-flex">
      <img [src]="block.owner.getImage()" class="rounded" height="44px" width="44px">
      <div class="d-flex flex-column align-items-start justify-content-center px-2">
        <a [routerLink]=" ['/profiles', block.owner._id] " style="color: #777777; font-size: 11pt;">{{block.owner.name}}</a>
        <span class="user-score" style="font-size: 10pt; color: #777; font-weight: bold;">{{block.owner.score}}</span>
      </div>
      </div>
      
    </div>
  `
})
export class BasicUserBadgeComponent {
  @Input('block')
  public block: Block;
}
