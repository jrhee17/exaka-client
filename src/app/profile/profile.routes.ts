import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ProfileEditComponent} from "./edit/profile-edit.component";
import {Angular2TokenService} from "angular2-token";
import {ProfilePasswordComponent} from "./password/profile-password.component";
import {ProfileDeleteComponent} from "./delete/profile-delete.component";
import {ProfileOwnerAccess} from "./ProfileOwnerAccess";
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
import {ProfileMainComponent} from "./main/profile-main.component";
import {ProfileUsersComponent} from "./users/profile-users.component";
/**
 * Created by john on 03/05/2017.
 */

export const routes = [
  {
    path: 'profiles', component: ProfileUsersComponent
  },
  {
    path: 'profiles/:id', component: ProfileComponent, children: [

      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: ProfileMainComponent },
      { path: 'edit', component: ProfileEditComponent, canActivate: [ProfileOwnerAccess] },
      { path: 'activity', component: ProfileActivityComponent, children: [
        { path: '', redirectTo: 'summary', pathMatch: 'full' },
        { path: 'summary', component: ProfileActivitySummaryComponent},
        { path: 'questions', component: ProfileActivityQuestionsComponent},
        { path: 'answers', component: ProfileActivityAnswersComponent},
        { path: 'tags', component: ProfileActivityTagsComponent},
        { path: 'actions', component: ProfileActivityActionsComponent},
        { path: 'responses', component: ProfileActivityResponsesComponent},
        { path: 'favorites', component: ProfileActivityFavoritesComponent},
        { path: 'votes', component: ProfileActivityVotesComponent},
        { path: 'reputations', component: ProfileActivityReputationsComponent},
        { path: '**', component: ProfileActivitySummaryComponent},
        ]
      },
      { path: 'password', component: ProfilePasswordComponent, canActivate: [ProfileOwnerAccess] },
      { path: 'delete', component: ProfileDeleteComponent, canActivate: [ProfileOwnerAccess]},
      { path: '**', component: ProfileUsersComponent },
    ],
  }
];
