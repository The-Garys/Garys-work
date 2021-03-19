import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'services', component: ServicesListComponent },
  { path: 'providerSignup', component: SignUpComponent },
  { path: 'userSignup', component: SignupComponent },
  { path: 'spProfile', component: SpProfileComponent, canActivate:[AuthGuard] },
  {path: 'homeServices', component: ServicesListComponent} , 
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'userServices', component: UserServicesComponent,canActivate:[AuthGuard]},
  {path: 'userHome', component: UserHomeComponent, canActivate:[AuthGuard]},
  {path:'admin/login',component:AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
