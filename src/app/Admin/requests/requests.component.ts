import { Component, OnInit } from '@angular/core';
import {AdminServices} from '../admin.service'
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requests : any = [];
  constructor(private admin: AdminServices) { }

  ngOnInit(): void {
    this.admin.getSpList().subscribe(data => {
      this.requests = data
      console.log(data);
      
    })
  }

}
