import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  updateRole = new EventEmitter();

  role : string = "guest"

  changeRole (newRole) {
    this.role = newRole;
    this.updateRole.emit(this.role)
  }
}
