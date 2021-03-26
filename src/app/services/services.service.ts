import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServiceProviders() {
    return this.http.get('http://localhost:3000/api/serviceProviderList/services');
  }

  getProfessions() {
    return this.http.get('http://localhost:3000/api/professions/getProfessions')
  }
  getRating(i) {
  return this.http.get( `http://localhost:3000/api/review/getReviews/${i}`)
  }
   }


  


