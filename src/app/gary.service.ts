import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GaryService {
  apiURL: string = 'http://localhost:3000/api/serviceProvider/profile';
  constructor(private httpClient: HttpClient) {}

  public getData(token) {
    return this.httpClient.get(this.apiURL + '/' + token);
  }
  public addReview(body) {
    return this.httpClient.post(this.apiURL + '/addReview', body);
  }
}
