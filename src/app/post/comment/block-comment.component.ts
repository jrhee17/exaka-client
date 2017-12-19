/**
 * Created by john on 02/08/2017.
 */
import {Component, Input} from "@angular/core";
import {Comment} from "../../models/comment";

@Component({
  selector: 'block-comment',
  template: `
    <span class="ml-3">{{comment.content}}</span>
    <a class="px-2 py-1 mx-1 rounded" style="background-color: #bdc6db; color: #fff;" [routerLink]=" ['/profiles', comment.owner._id] "><small>{{ comment.owner.name }}</small></a>
    <span style="color: #777777; font-size: 9pt;">{{ comment.getCreatedAt() }}</span>
    <hr>
  `
})
export class BlockCommentComponent {

  @Input('comment')
  public comment: Comment;

}
