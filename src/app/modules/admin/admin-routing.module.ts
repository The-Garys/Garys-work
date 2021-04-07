import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';

const routes: Routes = [
  { 
    path: "",
    children: [
      {
        path: "login",
        component: AdminLoginComponent
      },
      {
        path: "messages",
        component: AdminMessagesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
