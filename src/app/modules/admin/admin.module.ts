import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class AdminModule { }
