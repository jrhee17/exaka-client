/**
 * Created by john on 02/04/2017.
 */
import {Component, AfterViewInit, Renderer, ElementRef} from "@angular/core";

import {Post} from "../../models/post";
import {Angular2TokenService} from "angular2-token";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ModelError} from "../../models/model-error";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {PostActionTypes} from "../post.actions";

@Component({
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent {

  public post: Post = new Post();
  public modelError: ModelError;

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    return this._tokenService.get(`tags/by_name/${text}`)
      .map((res) => res.json().data);
  };

  constructor(private _tokenService: Angular2TokenService, private _store: Store<Post>, private _router: Router) {
  }

  public addPostButtonClicked(): void {
    this._tokenService.post('posts', this.post).subscribe(
      (res) => {
        this._store.dispatch({type: PostActionTypes.POST_SET_DATA, payload: res.json()});
        this._router.navigateByUrl(`post/${res.json().data._id}`)
      }, (error) => {
        console.log('PostAddComponent addPostButtonClicked error' + error);
        this.modelError = new ModelError(error.json().data);
        debugger;
      }
    )
  }

  private addImageButtonClicked(): void {
    console.log('PostAddComponent addImageButtonClicked');
  }

  selectUploadedImage($event): void {
    var image_file_filename = $event.data.image_file_filename;
    this.post.main_block.appendImage(`image/${image_file_filename}`);
  }

}
