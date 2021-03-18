import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    admin : boolean = false;
    UserIsAuthenticated() {
      var h = !!localStorage.getItem('userToken');
      if(h){
        return "user"
      } else {
        return "not"
      }
       
    }

    spIsAuthentictaed() {
    
      var h = !!localStorage.getItem('spToken');
      if(h){
        return "sp"
      } else {
        return "not"
      }
       
    }
}