import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router : Router) {}
  
  canActivate() : boolean {
    if(this.authservice.UserIsAuthenticated() &&  !this.authservice.SpIsAuthentiated()) {
      return true;
    }

    
    else if(this.authservice.SpIsAuthentiated && !this.authservice.UserIsAuthenticated()) {
      return true;
    }
    

    else {
      this.router.navigate(['signin']);
      return false;
    }
  }
}
