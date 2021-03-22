import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
// import { Router } from '@angular/router';
// import {ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor(
    private GaryService: GaryService,
    private http: HttpClient,
    private local: LocalService
  ) {} 
  name : any = localStorage.getItem("apUserName")
  spData: any;
  data: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  ngOnInit(): void {

  
    if (localStorage.getItem('visitor') === 'yes') {
      this.visitor = true;
      this.visitor1 = false;
    } else {
      this.visitor = false;
      this.visitor1 = true;
    }
    // this.spEmail = localStorage.getItem('spEmail');
    this.svMail = localStorage.getItem('svMail');
    this.http
      .get(`http://localhost:3000/api/serviceProvider/${this.svMail}`)
      .subscribe((data) => {
        this.spData = data;
       alert(this.data['_id'])
        console.log("getting me ddddd", this.data['_id']);


      });
    // console.log('local email', this.local.email);
    
  }
  submit( date, time) {
    
    var obj = {userName : this.name , email : this.spData.email , serviceProviderName : this.spData._id , date : date , time : time }
    console.log(obj.serviceProviderName)
    var c = {
      date: date,
      time:time,
      userName: this.name,
      email: this.spData.email,
      serviceProviderName: this.spData._id
    }
    if (!date ||  !time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    } else {
      this.http
        .post('http://localhost:3000/api/appointment', c)
        .subscribe((data) => {
          if (data['data']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Not available!',
              footer: '<a href>Why do I have this issue?</a>',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Appointment added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  }

  check: boolean = false;
  posts: boolean = true;
  reviews: boolean = false;
  settings: boolean = false;

  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
  }
  setting() {
    console.log(this.spData._id)
    this.http
    .get(
      `http://localhost:3000/api/appointment/${this.spData._id}`
    )
    .subscribe((data) => {
      console.log("dzdazdazda " , data)
      this.data = data;
      this.posts = false;
      this.reviews = false;
      this.settings = true;
      
    });

  }
}
