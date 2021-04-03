import { Component, OnInit } from '@angular/core';
import { NAME } from '../services-list/mock-service';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
  providers: [NgbRatingConfig],
})
export class ServicesListComponent implements OnInit {
  services: any = [];
  username: string;
  list: any = NAME;
  data: any;
  backup: any = [];
  location: any = NAME;
  reviews: any = [];

  constructor(
    private http: HttpClient,
    private local: LocalService,
    config: NgbRatingConfig,
    private servicesService: ServicesService
  ) {
    config.max = 5;
    config.readonly = true;
  }
  role: string = this.local.role;
  ngOnInit(): void {}
}
