import { Component, OnInit } from '@angular/core';
import { SERVICES, NAME } from '../services-list/mock-service';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {ServicesService} from '../services/services.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss'],
  providers: [NgbRatingConfig],
})
export class UserServicesComponent implements OnInit {
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
    private serviceList : ServicesService,
    private router: Router,
    config: NgbRatingConfig,
  ) {
    config.max = 5;
    config.readonly = true;
  }
  role: string = this.local.role;
  ngOnInit(): void {
    console.log('dddddzadad', this.local.role);
    this.list = NAME;
    this.services = [];
    this.list = [];
    this.getServices();
    this.getProfessions();
    this.getRating();
  }
  getServices() {
   
      this.serviceList.getServiceProviders().subscribe((data) => {
        console.log('are those sps ?? ===>', data);
        this.services = data;
        this.services = this.services.filter((el) => {
          return el.isBanned === false;
        });
        this.backup = data;
      });
  }
  getProfessions() {
    this.serviceList.getProfessions()
      .subscribe((data) => {
        this.list = data;
      });
  }
  getRating() {
    console.log(this.services);

    for (var i = 0; i < this.services.length; i++) {
      console.log(
        'hedhy kol post wahadhaaaaa ===+====+==+===>',
        this.services[i]
      );
      this.serviceList.getRating(this.services[i].email)
        .subscribe((data) => {
          this.reviews = data;
          var totalRate = 0;
          for (var j = 0; j < this.reviews.length; j++) {
            totalRate += this.reviews[j].rate;
          }
          this.services[i].rate = totalRate / this.reviews.length;
        });
    }
  }
  goSvProfile(svMail) {
    localStorage.setItem('halimMail', svMail);
    this.router.navigateByUrl('/fisitor');
  }
  getVal(val) {
    console.log(val);
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.fullName.toUpperCase();
      if (name.includes(val)) {
        newArray.push(e);
      }
    });
    this.services = newArray;
  }

  dropVal(val) {
    // console.log(val)
    this.services = this.backup;
    if (val !== 'all') {
      var newArr = [];
      this.services.map((e) => {
        val = val.toUpperCase();
        var name = e.profession.toUpperCase();
        if (name.includes(val)) {
          newArr.push(e);
        }
      });
      this.services = newArr;
    }
  }

  dropLoc(val) {
    console.log(val);
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.location.toUpperCase();
      if (name.includes(val)) {
        newArray.push(e);
      }
    });
    this.services = newArray;
  }
}
