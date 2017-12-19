/**
 * Created by john on 26/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { PostsSearchService } from './posts-search.service';
import { Post } from '../../models/post';

@Component({
  selector: 'posts-search',
  templateUrl: './posts-search.component.html',
  providers: [PostsSearchService],
  styleUrls: ['post-search.component.scss']
})
export class PostsSearchComponent implements OnInit {
  public posts: Post[] = [];
  public pageNum: number;
  public count: number;
  public pageSize: number;

  constructor(private _postsSearchService: PostsSearchService) {
    this.pageNum = 1;
    this.pageSize = 15;
  }

  public ngOnInit(): void {
    this.getPosts(1, this.pageSize);
  }

  public pageChange(): void {
    this.getPosts(this.pageNum, this.pageSize);
  }

  public getPosts(pageNum: number, pageSize: number): void {
    this._postsSearchService.getPosts(pageNum, pageSize).then(
      (page) => {
        this.posts = page.posts; this.count = page.count;
      }
    );
  }
}
