import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminMessagesService {
  apiURL: string = 'http://localhost:3000/api/contactus';

  constructor(private httpClient: HttpClient) {}

  public getMessages() {
    return this.httpClient.get(this.apiURL);
  }

  public deleteMessage(id) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }

  public deleteAll() {
    return this.httpClient.delete(this.apiURL);
  }
}
