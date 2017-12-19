import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { PostDetailComponent } from './post/detail/post-detail.component';
import {Angular2TokenService} from "angular2-token";
import {ProfileComponent} from "./profile/profile.component";
import {PostAddComponent} from "./post/add/post-add.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'post',  loadChildren: './post#PostModule'},
  { path: 'auth', loadChildren: './auth#AuthModule'},
  { path: 'profiles', loadChildren: './profile#ProfileModule'},
  { path: 'tags', loadChildren: './tags#TagsModule'},
  { path: '**',    component: HomeComponent },
];
