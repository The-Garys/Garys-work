import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http : HttpClient) { }
  
  sendReport(id) {
  return this.http.put(`http://localhost:3000/api/review/reportUser/${id}`, {}, {});
  }

}
