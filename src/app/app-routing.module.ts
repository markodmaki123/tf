import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { CreatepostComponent } from './createpost/createpost.component';
import { CommunityComponent } from './community/community.component';
import { CreatecommunityComponent } from './createcommunity/createcommunity.component';
import { UpdatecommunityComponent } from './updatecommunity/updatecommunity.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: ':username/home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: ':username/createpost',
    component: CreatepostComponent,
  },
  {
    path: ':username/community/:name',
    component: CommunityComponent,
  },  
  {
    path: 'community/:name',
    component: CommunityComponent,
  },  
  {
    path: ':username/createcommunity',
    component: CreatecommunityComponent,
  },
  {
    path: ':username/:name/updatecommunity',
    component: UpdatecommunityComponent,
  },
  {
    path: ':username/updateuser',
    component: UpdateuserComponent,
  },  
  {
    path: ':username/changepassword',
    component: ChangepasswordComponent,
  },
  {
    path: ':username/userdetails',
    component: UserdetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }