import { Component, OnInit, OnDestroy } from '@angular/core';
import { SERVICES, NAME } from '../services-list/mock-service';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss'],
  providers: [NgbRatingConfig],
})
export class UserServicesComponent implements OnInit, OnDestroy {
  services: any = [];
  username: string;
  list: any = NAME;
  data: any;
  backup: any = [];
  location: any = NAME;
  reviews: any = [];
  n: any = '';
  l: any = '';
  p: any = '';
  svMail: string = localStorage.getItem('svMail');
  constructor(
    private http: HttpClient,
    private local: LocalService,
    private serviceList: ServicesService,
    private router: Router,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
    this.router.events.subscribe((res) => {
      if (res['url'] !== res['urlAfterRedirects']) {
        console.log('naaaaaaaav', res);

        this.local.pick = '';
        this.ngOnInit();
      }
    });
  }
  role: string = this.local.role;
  ngOnInit(): void {
    console.log('piiiiiiiiiiiiiiiiick', this.local.pick);
    this.list = NAME;
    this.services = [];
    this.list = [];
    this.getServices();
    this.getProfessions();
    this.getRating();
  }
  ngOnDestroy(): void{
    this.local.pick=""
  }

  getServices() {
    this.serviceList.getServiceProviders().subscribe((data) => {
      console.log('are those sps ?? ===>', data);
      this.services = data;
      this.services = this.services.filter((el) => {
        return el.isBanned === false && el.email !== this.svMail;
      });
      this.backup = this.services;
      this.filterServiceByProfession(this.local.pick);
    });
  }

  getProfessions() {
    this.serviceList.getProfessions().subscribe((data) => {
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
      this.serviceList.getRating(this.services[i].email).subscribe((data) => {
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
  filterServiceByName(val) {
    console.log(val);
    this.n = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      if (
        name.includes(val) &&
        profession.includes(this.p) &&
        location.includes(this.l)
      ) {
        newArray.push(e);
      }
    });
    this.services = newArray;
    console.log('dazdzad', val, this.services);
  }

  filterServiceByProfession(val) {
    console.log(val);
    // console.log(val)
    var newArr = [];
    if (val === 'all') {
      this.services = this.backup;
      this.services.map((e) => {
        var name = e.fullName.toUpperCase();
        var location = e.location.toUpperCase();
        if (name.includes(this.n) && location.includes(this.l)) {
          newArr.push(e);
        }
      });
      this.services = newArr;
    } else {
      this.p = val.toUpperCase();
      this.services = this.backup;
      this.services.map((e) => {
        val = val.toUpperCase();
        var name = e.fullName.toUpperCase();
        var profession = e.profession.toUpperCase();
        var location = e.location.toUpperCase();
        if (
          name.includes(this.n) &&
          profession.includes(val) &&
          location.includes(this.l)
        ) {
          newArr.push(e);
        }
      });
      this.services = newArr;

      console.log(val, this.services);
    }
  }

  dropLoc(val) {
    console.log(val);
    this.l = val.toUpperCase();
    this.services = this.backup;
    var newArray = [];
    this.services.map((e) => {
      val = val.toUpperCase();
      var name = e.fullName.toUpperCase();
      var profession = e.profession.toUpperCase();
      var location = e.location.toUpperCase();
      if (
        name.includes(this.n) &&
        profession.includes(this.p) &&
        location.includes(val)
      ) {
        newArray.push(e);
      }
    });
    this.services = newArray;
    console.log(val, this.services);
  }
}
