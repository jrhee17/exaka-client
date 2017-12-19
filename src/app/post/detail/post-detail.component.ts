import { OnInit, Component, OnDestroy } from '@angular/core';
import { PostDetailService } from '../post-detail.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Post } from '../../models/post';
import {Store} from "@ngrx/store";
import {POST_RESET} from "../post.reducer";

@Component ({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  providers: [PostDetailService],
  styleUrls: [
    './post-detail.component.scss'
  ]
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public post: Post;
  private id: string;
  private routeSub: any;

  constructor(private postDetailService: PostDetailService, private route: ActivatedRoute, private _store: Store<Post>, private _router: Router) {}

  public ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.postDetailService.getPost(this.id);
    });

    this._store.select<Post>('post').subscribe(
      post => this.post= post
    );
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
    this._store.dispatch({type: POST_RESET});
  }

}
