import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  // getAllServices(): Observable<Service[]> {
  //   return this.http.get("http://localhost/3000/api/serviceProviderList")
  // }


  

}
