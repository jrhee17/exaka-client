/**
 * Created by john on 01/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Post } from '../models/post';

import 'rxjs/add/operator/toPromise';
import {Angular2TokenService} from "angular2-token";
import {Store} from "@ngrx/store";
import {PostActionTypes} from "./post.actions";

@Injectable()
export class PostDetailService {

  constructor(
    private http: Http,
    private _tokenService: Angular2TokenService,
    public _store: Store<Post>,
  ) {}

  public getPost(id: string): Promise<Post> {
    let url = `posts/${id}`;

    return this._tokenService.get(url).toPromise().then((response) => {
      this._store.dispatch({type: PostActionTypes.POST_SET_DATA, payload: response.json()});
      return ;
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    debugger;
    return Promise.reject(error.message || error);
  }

}
