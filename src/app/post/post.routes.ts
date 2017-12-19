import {PostDetailComponent} from "./detail/post-detail.component";
import {Angular2TokenService} from "angular2-token";
import {PostSubListComponent} from "./block/post-sub-list.component";
import {PostSubAddComponent} from "./block/post-sub-add.component";
import {PostAddComponent} from "./add/post-add.component";
import {PostEditComponent} from "./edit/post-edit.component";
import {PostSubEditComponent} from "./block/post-sub-edit.component";
import {BlockHistoryListComponent} from "./block/block-history-list.component";
/**
 * Created by john on 14/05/2017.
 */
export const routes = [
  {
    path: 'post/history/:block_id',
    component: BlockHistoryListComponent
  },
  {
    path: 'post/:id/edit',
    component: PostEditComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'post/:id', component: PostDetailComponent, children: [
    { path: '', redirectTo: 'answers', pathMatch: 'full' },
    { path: 'answers', component: PostSubListComponent},
    { path: 'answer/new', component: PostSubAddComponent },
    { path: 'answer/:sub_block_id/edit', component: PostSubEditComponent},
    { path: '**', component: PostSubListComponent },
  ],
  },
  {
    path: 'question/ask',
    component: PostAddComponent,
    canActivate: [Angular2TokenService]
  },
];
