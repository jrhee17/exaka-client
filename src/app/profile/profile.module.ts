/**
 * Created by john on 03/05/2017.
 */

import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {Angular2TokenService} from "angular2-token";
import {PreventLoggedInAccess} from "../auth/PreventLoggedInAccess";
import {RouterModule} from "@angular/router";
import {routes} from './profile.routes'
import {CommonModule} from "@angular/common";
import {ProfileEditComponent} from "./edit/profile-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileEditImageComponent} from "./edit/image/profile-edit-image.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProfilePasswordComponent} from "./password/profile-password.component";
import {ProfileDeleteComponent} from "./delete/profile-delete.component";
import {UtilsModule} from "../utils/utils.module";
import {ProfileOwnerAccess} from "./ProfileOwnerAccess";
import {AnswersSummaryComponent} from "./activity/summary/answers/answers-summary.component";
import {QuestionsSummaryComponent} from "./activity/summary/questions/questions-summary.component";
import {TagsSummaryComponent} from "./activity/summary/tags/tags-summary.component";
import {ProfileActivityComponent} from "./activity/profile-activity.component";
import {ProfileActivitySummaryComponent} from "./activity/summary/profile-activity-summary.component";
import {ProfileActivityQuestionsComponent} from "./activity/questions/profile-activity-questions.component";
import {ProfileActivityAnswersComponent} from "./activity/answers/profile-activity-answers.component";
import {ProfileActivityTagsComponent} from "./activity/tags/profile-activity-tags.component";
import {ProfileActivityActionsComponent} from "./activity/actions/profile-activity-actions.component";
import {ProfileActivityResponsesComponent} from "./activity/responses/profile-activity-responses.component";
import {ProfileActivityFavoritesComponent} from "./activity/favorites/profile-activity-favorites.component";
import {ProfileActivityVotesComponent} from "./activity/votes/profile-activity-votes.component";
import {ProfileActivityReputationsComponent} from "./activity/reputations/profile-activity-reputations.component";
import {ReputationBlockComponent} from "./activity/reputations/reputation-block.component";
import {NgSpinKitModule} from "ng-spin-kit";
import {ChartsModule} from "ng2-charts";
import {ReputationChartComponent} from "./activity/reputations/reputation-chart.component";
import {ReputationMiniGraphComponent} from "./activity/reputation-mini-graph.component";
import {ProfileMainComponent} from "./main/profile-main.component";
import {ProfileMainTagsComponent} from "./main/tags/profile-main-tags.component";
import {ProfileMainPostsComponent} from "./main/posts/profile-main-posts.component";
import {ProfileUsersComponent} from "./users/profile-users.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    UtilsModule,
    NgSpinKitModule,
    ChartsModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ProfileActivityComponent,
    ProfileEditImageComponent,
    ProfilePasswordComponent,
    ProfileDeleteComponent,
    AnswersSummaryComponent,
    QuestionsSummaryComponent,
    TagsSummaryComponent,
    ProfileActivitySummaryComponent,
    ProfileActivityQuestionsComponent,
    ProfileActivityAnswersComponent,
    ProfileActivityTagsComponent,
    ProfileActivityActionsComponent,
    ProfileActivityResponsesComponent,
    ProfileActivityFavoritesComponent,
    ProfileActivityVotesComponent,
    ProfileActivityReputationsComponent,
    ReputationBlockComponent,
    ReputationChartComponent,
    ReputationMiniGraphComponent,
    ProfileMainComponent,
    ProfileMainTagsComponent,
    ProfileMainPostsComponent,
    ProfileUsersComponent,
  ],
  providers: [
    Angular2TokenService,
    PreventLoggedInAccess,
    ProfileOwnerAccess,
  ],
  bootstrap: [
    ProfileComponent,
  ],
})
export class ProfileModule {}
