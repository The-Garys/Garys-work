import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
import * as moment from 'moment';
import { ProfileService } from '../services/profile.service';
import Swal from 'sweetalert2';

// import { Router } from '@angular/router';
@Component({
  selector: 'app-vesitor-profile',
  templateUrl: './vesitor-profile.component.html',
  styleUrls: ['./vesitor-profile.component.scss'],
})
export class VesitorProfileComponent implements OnInit {
  serviceProviderReviews: any;
  constructor(
    private GaryService: GaryService,
    private http: HttpClient,
    private local: LocalService,
    private profileServices: ProfileService
  ) {}
  name: any = localStorage.getItem('apUserName');
  spData: any;
  appointmentsList: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  spPosts: any;
  notifications: number = 0;
  editable: boolean = false;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  adress: string;
  previousPassword: string;
  currentPassword: string;
  confirmPassword: string;
  imageUrl: string;
  userIsLoggedIn: boolean;
  spIsLoggedIn: boolean;
  userData: any;
  checkLog() {
    this.userIsLoggedIn = !!localStorage.getItem('id');
    this.spIsLoggedIn = !!localStorage.getItem('svMail');
  }

  alertSignup() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'please Login to make an Appointment!',
    });
  }

  ngOnInit(): void {
    
    this.checkLog();
    this.getUserData(localStorage.getItem('id'));
    this.visitor = true;
    this.visitor1 = false;

    this.svMail = localStorage.getItem('halimMail');

    this.profileServices
      .getServiceProviderData(this.svMail)
      .subscribe((data) => {
        console.log('ali====>', data);
        this.serviceProviderReviews = data['reviews'];
        this.spData = data['data'];
        this.getAppointments();
        this.profileServices
          .getServiceProviderPosts(this.spData._id)
          .subscribe((data) => {
            console.log('daaaaaaaataaa==>', data);
            this.spPosts = data;
            this.spPosts = this.spPosts.reverse();
            for (var i = 0; i < this.spPosts.length; i++) {
              this.spPosts[i].updatedAt = moment(
                this.spPosts[i].updatedAt
              ).format('LLL');
            }
          });
      });
  }

  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
  }

  submit(date, time) {
    var c = {
      date: date,
      time: time,
      userName: this.name,
      email: this.spData.email,
      serviceProviderName: this.spData._id,
      sPName: this.spData.fullName,
      userId: localStorage.getItem('id'),
      userEmail: this.userData.email,
      userPhoneNumber: this.userData.phoneNumber,
    };

    if (!date || !time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    } else {
      this.profileServices.submitAppointment(c).subscribe((data) => {
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
  getUserData(id) {
    console.log('here is the id ==+>', id);

    this.http
      .get('http://localhost:3000/api/user/' + id)
      .subscribe((data): any => {
        console.log('is my used here ? ==>', data);
        this.userData = data;
      });
  }

  check: boolean = false;
  posts: boolean = true;
  reviews: boolean = false;
  settings: boolean = false;
  Security: boolean = false;
  appointments: boolean = false;

  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
    this.Security = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
    this.appointments = false;
    this.Security = false;
  }
  appointment() {
    this.posts = false;
    this.reviews = false;
    this.settings = false;
    this.appointments = true;
    this.Security = false;
  }

  setting() {
    this.posts = false;
    this.reviews = false;
    this.settings = true;
    this.appointments = false;
    this.Security = false;
  }
  security() {
    this.posts = false;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
    this.Security = true;
  }

  getAppointments() {
    console.log('spdat===>', this.spData._id);
    this.profileServices
      .getSericeProviderAppointments(this.spData._id)
      .subscribe((data) => {
        console.log('dzdazdazda', data);
        this.appointmentsList = data;
        this.notifications = this.appointmentsList.length;
      });
  }

  goToAppointments() {
    this.posts = false;
    this.reviews = false;
    this.appointments = true;
    this.settings = false;
  }

  displayForm() {
    this.editable = true;
  }
}
