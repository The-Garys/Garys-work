
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
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
  spData: any;
  data: any;
  token: string = localStorage.getItem('token');
  spEmail : string;
  visitor : boolean = false;
  visitor1 : boolean = false;
  svMail: string;
  ngOnInit(): void {
      // console.log('my data in the Profile',history.state.data.id)
      if(localStorage.getItem('visitor')=== "yes"){
        this.visitor = true;
        this.visitor1 = false;
      } else {
        this.visitor = false;
        this.visitor1 = true;
      }
    console.log('visitor' , this.visitor)
    this.spEmail = localStorage.getItem('spEmail');
    this.svMail = localStorage.getItem('svMail');
    console.log("user services profiles", this.svMail)
    console.log("service provider email", this.spEmail)
    this.http
      .get(`http://localhost:3000/api/serviceProvider/${this.spEmail}`)
      .subscribe((data) => {
        console.log('profile data', data);
        this.spData = data;
        console.log('profile data assigned', this.spData);
        console.log("getting appointment", this.spData['firstName']);
        // console.log("getting me ", this.data['firstName']);
        this.http
          .get(`http://localhost:3000/api/appointment/${this.spData['firstName']}`)
          .subscribe((data) => {
            console.log('appointment data yassmin', data);
            this.data = data;
          });
      });
    // console.log('local email', this.local.email);
  }
  submit(name , email , date , svname , time ){ 
    if(!name || !email || !date || !svname ||!time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    } else {
      this.http.post("http://localhost:3000/api/appointment",
      {userName : name , email : email , date : date , serviceProviderName:svname , time:time }).subscribe((data)=>{
        console.log(data)
        if(data["data"]){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Not available!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Appointment added successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      
       })
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
    this.posts = false;
    this.reviews = false;
    this.settings = true;
  }
}
