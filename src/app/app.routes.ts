import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'post',  loadChildren: './post#PostModule'},
  { path: 'auth', loadChildren: './auth#AuthModule'},
  { path: 'profiles', loadChildren: './profile#ProfileModule'},
  { path: 'tags', loadChildren: './tags#TagsModule'},
  { path: '**',    component: HomeComponent },
];
