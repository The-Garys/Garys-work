import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarResolver implements Resolve<String> {
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String> {
    
  }

}
