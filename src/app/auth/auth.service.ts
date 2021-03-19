import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor() { }

    admin : boolean = false;
    UserIsAuthenticated() {
      return !!localStorage.getItem('userToken');
    }

    SpIsAuthentiated() {
      return !!localStorage.getItem('sptoken');
    }

    
    
}