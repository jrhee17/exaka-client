import {Component, Input} from "@angular/core";
import {SubBlock} from "../../models/sub-block";
import {Post} from "../../models/post";
import {Store, select} from "@ngrx/store";
import {Angular2TokenService} from "angular2-token";
import {PostActionTypes} from "../post.actions";
import {AuthActionTypes} from "../../auth/service/auth.actions";
/**
 * Created by john on 15/05/2017.
 */

@Component({
  selector: 'post-sub-list',
  templateUrl: 'post-sub-list.component.html',
})
export class PostSubListComponent {

  public post: Post = new Post();

  private sortByUpdatedAt: (a, b) => number = (subBlock1: SubBlock, subBlock2: SubBlock) => {
    if (subBlock1.selecting_post_id != null)
      return -1;
    else if (subBlock2.selecting_post_id != null)
      return 1;
    else
      return subBlock1.updated_at.getTime() - subBlock2.updated_at.getTime();
  };

  private sortByVote: (a, b) => number = (subBlock1: SubBlock, subBlock2: SubBlock) => {
    if (subBlock1.selecting_post_id != null)
      return -1;
    else if (subBlock2.selecting_post_id != null)
      return 1;
    else
      return subBlock1.getVote() - subBlock2.getVote();
  };

  private sortByCreatedAt: (a, b) => number = (subBlock1: SubBlock, subBlock2: SubBlock) => {
    if (subBlock1.selecting_post_id != null)
      return -1;
    else if (subBlock2.selecting_post_id != null)
      return 1;
    else
      return subBlock1.created_at.getTime() - subBlock2.created_at.getTime();
  };

  private selectedSortFunction: (a, b) => number;

  constructor(private _store: Store<Post>, private _tokenService: Angular2TokenService) {
    this.selectedSortFunction = this.sortByUpdatedAt;

    this._store.pipe(select<Post, Post>('post')).subscribe(
      post => {
        if(post) {
          this.post= post;
          this.post.sortSubBlocks(this.selectedSortFunction);
        }
      }
    );
  }

  private subBlockSelected(sub_block_id: string): void {
    this._tokenService.post('posts/select', {id: this.post._id, sub_block_id: sub_block_id}).subscribe(
      (res) => {
        this._store.dispatch({type: PostActionTypes.POST_MERGE_DATA, payload: res.json().data.post});
        this._store.dispatch({type: AuthActionTypes.AUTH_SET_DATA, payload: res.json().data.auth});
      }, (error) => {
        console.log('PostSubBlockComponent select');
        debugger;
      }
    )
  }

  private sortByUpdatedAtButtonPressed(): void {
    this.selectedSortFunction = this.sortByUpdatedAt;
    this.post.sortSubBlocks(this.sortByUpdatedAt);
  }

  private sortByVoteButtonPressed(): void {
    this.selectedSortFunction = this.sortByVote;
    this.post.sortSubBlocks(this.sortByVote);
  }

  private sortByCreatedAtButtonPressed(): void {
    this.selectedSortFunction = this.sortByCreatedAt;
    this.post.sortSubBlocks(this.sortByCreatedAt);
  }

}
