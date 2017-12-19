import {Component} from "@angular/core";
import {ModelError} from "../../models/model-error";
import {SubBlock} from "../../models/sub-block";
import {Store} from "@ngrx/store";
import {Angular2TokenService} from "angular2-token";
import {Router, ActivatedRoute} from "@angular/router";
import {PostDetailService} from "../post-detail.service";
import {POST_UPDATE_SUBBLOCK} from "../post.reducer";
import {AuthService} from "../../auth.service";
import {Post} from "../../models/post";
/**
 * Created by john on 25/05/2017.
 */

@Component({
  selector: 'post-sub-edit',
  templateUrl: 'post-sub-edit.component.html'
})
export class PostSubEditComponent {

  public subBlock: SubBlock = new SubBlock();
  public modelError: ModelError;
  private subBlockId: string;
  private postId: string;

  constructor(private _store: Store<Post>,
              private _tokenService: Angular2TokenService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthService) {

    this._activatedRoute.parent.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this._activatedRoute.params.subscribe((params) => {
      this.subBlockId = params['sub_block_id'];
      this._tokenService.get(`sub_blocks/${this.subBlockId}`).subscribe(
        (res) => {
          this.subBlock = new SubBlock(res.json().data);
        }, (error) => {
          console.log('PostSubEditComponent constructor');
          debugger;
        }
      )
    });
  }

  updateButtonPressed(): void {
    this.subBlock.post_id = this.postId;
    this._authService.put(`sub_blocks/${this.subBlockId}`, this.subBlock).subscribe(
      (res) => {
        this._store.dispatch({type: POST_UPDATE_SUBBLOCK, payload: res.json()});
        this._router.navigate([`post/${this.postId}/answers`]);
      }, (error) => {
        console.log('PostSubEditComponent updateButtonPressed');
        debugger;
      }
    )
  }

  selectUploadedImage($event): void {
    this.subBlock.appendImage($event.data.image_file.url);
  }

}
