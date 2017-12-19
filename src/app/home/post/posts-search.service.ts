/**
 * Created by john on 26/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Post } from '../../models/post';

import 'rxjs/add/operator/toPromise';
import { Page } from '../../models/page';
import {Angular2TokenService} from "angular2-token";

@Injectable()
export class PostsSearchService {

  private url = `posts`;

  constructor(
    private _tokenService: Angular2TokenService
  ) {}

  public getPosts(page: number, pageSize: number): Promise<Page> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('search', '');
    params.set('page', String(page));
    params.set('per_page', String(pageSize));

    let options = { search: params };

    return this._tokenService.get(this.url, options).toPromise().then(
      (response) => {
        let objs = response.json().data || [];
        let count = response.json().count || 0;
        let posts = [];

        objs.forEach((obj) => posts.push(new Post(obj)));

        return new Page(posts, count);
      }
    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    debugger;
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
