import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component'

import { AppComponent } from './app.component';
import { FooterComponent } from './homepage/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
