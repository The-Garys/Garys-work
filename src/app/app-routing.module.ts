import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminComponent } from './Admin/admin/admin.component';
import {MessagesComponent} from './Admin/messages/messages.component';
import {ProvidersComponent} from './Admin/providers/providers.component'




const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  {path:'admin', component:AdminComponent},
  { path: 'alogin', component: AdminLoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'services', component: ServicesListComponent },
  { path: 'providerSignup', component: SignUpComponent },
  { path: 'userSignup', component: SignupComponent },
  { path: 'spProfile', component: SpProfileComponent },
  {path: 'homeServices', component: ServicesListComponent} , 
  {path: 'admin', component: AdminComponent, children:[{path:'', component:AdminComponent},{path:'sps', component:ProvidersComponent},{path:'messages', component:MessagesComponent},]},
  
  {path: 'userServices', component: UserServicesComponent},
  {path: 'userHome', component: UserHomeComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
