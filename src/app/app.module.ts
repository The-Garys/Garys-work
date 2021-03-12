import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component'

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';

import { FooterComponent } from './homepage/footer/footer.component';

import { ServiceSectionComponent } from './homepage/service-section/service-section.component';
import { AboutComponent } from './homepage/about/about.component';
import { TestimonialsComponent } from './homepage/testimonials/testimonials.component'; 
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';

import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomepageComponent,
    FooterComponent,
    ServiceSectionComponent,
    AboutComponent,
    TestimonialsComponent,
    SignUpComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot() 
    AppRoutingModule,
    SignupComponent,
    HttpClientModule
  ],





  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
