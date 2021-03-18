import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServiceSectionComponent } from './homepage/service-section/service-section.component';
import { AboutComponent } from './homepage/about/about.component';
import { TestimonialsComponent } from './homepage/testimonials/testimonials.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesListComponent } from './services-list/services-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGuard} from './auth/auth.guard'

import { FormsModule } from '@angular/forms';

import { SpProfileComponent } from './sp-profile/sp-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReviewsComponent } from './reviews/reviews.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminComponent } from './Admin/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    ServiceSectionComponent,
    AboutComponent,
    TestimonialsComponent,
    SignInComponent,
    SignUpComponent,
    SignupComponent,
    ServicesListComponent,
    NavbarComponent,
    SpProfileComponent,
    ReviewsComponent,
    AdminNavComponent,
    MessagesComponent,
    AppointmentComponent,
    UserNavComponent,
    UserServicesComponent,
    UserHomeComponent,
    AdminLoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,

  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
