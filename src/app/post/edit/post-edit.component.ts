/**
 * Created by john on 23/05/2017.
 */

import {Component} from "@angular/core";
import {Post} from "../../models/post";
import {Store, select} from "@ngrx/store";

import {Angular2TokenService} from "angular2-token";
import {PostDetailService} from "../post-detail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ModelError} from "../../models/model-error";
import {PostActionTypes} from "../post.actions";

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [PostDetailService],
})
export class PostEditComponent {

  public post: Post = new Post();
  public modelError: ModelError;

  constructor(private _store: Store<Post>,
              private _tokenService: Angular2TokenService,
              private _postDetailService: PostDetailService,
              private _route: ActivatedRoute,
              private _router: Router) {
    _route.params.subscribe((params) => {
      this._postDetailService.getPost(params['id'])
    });
    _store.pipe(select<Post, Post>('post')).subscribe((post) => this.post = new Post(post));
  }

  public updatePostButtonClicked(): void {
    this._tokenService.put(`posts/${this.post._id}`, this.post).subscribe(
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

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    return this._tokenService.get(`tags/by_name/${text}`)
      .map((res) => res.json().data);
  };

  selectUploadedImage($event): void {
    this.post.main_block.appendImage($event.data.image_file.url);
  }

}
