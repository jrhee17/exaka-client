import { Post } from './post';
/**
 * Created by john on 28/03/2017.
 */
export class Page {

  constructor(public posts: Post[], public count: number) {
    this.posts = posts;
    this.count = count;
  }
}
