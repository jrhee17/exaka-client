import {PostDetailComponent} from "./detail/post-detail.component";
import {PostMainBlockComponent} from "./block/post-main-block.component";
import {PostSubBlockComponent} from "./block/post-sub-block.component";
import {Angular2TokenService} from "angular2-token";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {routes} from "./post.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PostSubListComponent} from "./block/post-sub-list.component";
import {PostSubAddComponent} from "./block/post-sub-add.component";
import {CommentAddComponent} from "../comment/comment-add.component";
import {PostAddComponent} from "./add/post-add.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TagInputModule} from "ngx-chips";
import {PostEditComponent} from "./edit/post-edit.component";
import {PostSubEditComponent} from "./block/post-sub-edit.component";
import {BlockFlagComponent} from "./utils/block-flag.component";
import {AuthService} from "../auth.service";
import {AuthModule} from "../auth/auth.module";
import {BlockHistoryListComponent} from "./block/block-history-list.component";
import {ContentHistoryComponent} from "./block/content-history.component";
import {MarkedDirective} from "./marked.directive";
import {UtilsModule} from "../utils/utils.module";
import {BlockCommentComponent} from "./comment/block-comment.component";
/**
 * Created by john on 14/05/2017.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    TagInputModule,
    BrowserAnimationsModule,
    AuthModule,
    UtilsModule,
  ], declarations: [
    PostDetailComponent,
    PostMainBlockComponent,
    PostSubBlockComponent,
    PostSubListComponent,
    PostSubAddComponent,
    CommentAddComponent,
    PostAddComponent,
    PostEditComponent,
    PostSubEditComponent,
    BlockFlagComponent,
    BlockHistoryListComponent,
    ContentHistoryComponent,
    MarkedDirective,
    BlockCommentComponent,
  ], providers: [
    Angular2TokenService,
    AuthService,
  ], bootstrap: [
    PostDetailComponent
  ], exports: [
    MarkedDirective,
  ]
})
export class PostModule {

}
