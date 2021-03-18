import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  role : string = "guest"
  email : string;

  changeRole (newRole) {
    this.role = newRole;
    
  }
   

}
