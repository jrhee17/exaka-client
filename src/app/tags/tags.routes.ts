import {TagsComponent} from "./tags.component";
import {TagsDetailComponent} from "./detail/tags-detail.component";
/**
 * Created by john on 02/07/2017.
 */
export const routes = [
  {
    path: 'tags', component: TagsComponent,
  },
  {
    path: 'tags/:name', component: TagsDetailComponent,
  },
];
