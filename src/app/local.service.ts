import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  role : string = "guest"

  changeRole (newRole) {
    this.role = newRole;
    
  }
}
