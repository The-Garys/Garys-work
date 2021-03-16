import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'services', component: ServicesListComponent },
  { path: 'providerSignup', component: SignUpComponent },
  { path: 'userSignup', component: SignupComponent },
  { path: 'spProfile', component: SpProfileComponent },
  {path: 'homePage', component: HomepageComponent} , 
  {path: 'admin', component: AdminNavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
