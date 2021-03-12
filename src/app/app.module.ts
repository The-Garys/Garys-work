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
  ],
  imports: [BrowserModule, MDBBootstrapModule.forRoot(), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
