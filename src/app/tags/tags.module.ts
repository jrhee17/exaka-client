/**
 * Created by john on 02/07/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {routes} from "./tags.routes";
import {TagsComponent} from "./tags.component";
import {ProfileOwnerAccess} from "../profile/ProfileOwnerAccess";
import {PreventLoggedInAccess} from "../auth/PreventLoggedInAccess";
import {Angular2TokenService} from "angular2-token";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagsDetailComponent} from "./detail/tags-detail.component";
import {UtilsModule} from "../utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    UtilsModule,
  ],
  declarations: [
    TagsComponent,
    TagsDetailComponent,
  ],
  providers: [
    Angular2TokenService,
    PreventLoggedInAccess,
    ProfileOwnerAccess,
  ],
  bootstrap: [
    TagsComponent,
  ],
})
export class TagsModule {}
