import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
// import { ProfileService } from '../services/profile.service'
import * as moment from 'moment';
import {UserProfileService} from '../services/user-profile.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private GaryService: GaryService,
    private http: HttpClient,
    private local: LocalService,
    private userServices : UserProfileService
    ) { }

    name: any = localStorage.getItem("apUserName")
  spData: any;
  appointmentsList: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  spPosts:any;
  notifications : number =0
  editable:boolean = false
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  imageUrl : string
  ngOnInit(): void {
    this.svMail = localStorage.getItem('id');

    this.userServices.getUserData(this.svMail)
      .subscribe((data) => {
        console.log('user data====>', data);
        this.spData = data;
    });
  }
     
    imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.userServices.ImageUpload(formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
  }
 

  check: boolean = false;
  Security: boolean = false;
  settings: boolean = false;
  appointments: boolean = false;

 
  setting() {
    this.settings = true;
    this.appointments = false;
    this.Security = false;
  }
  appointment() {
    this.settings = false;
    this.appointments = true;
    this.Security = false;
  }
  security() {
    this.settings = false;
    this.appointments = false;
    this.Security = true;
  }

  updateUserDetails(firstName, lastName, userName, phoneNumber){
    // console.log(firstName, lastName, userName, email, phoneNumber)
    this.userServices.updateUserData(this.spData._id,firstName, lastName, userName, phoneNumber).subscribe((data)=>{
      console.log('newData', data)
      this.spData= data['data']
      this.getAppointments();
      Swal.fire(
                 '',
                 data['success'],
                 'success'
               );
    })
  }
  getAppointments() {
    console.log("spdat===>", this.spData._id);
    this.userServices.getUserAppointments(this.spData._id).
      subscribe((data) => {
        console.log('dzdazdazda', data);
        this.appointmentsList = data;
        this.notifications = this.appointmentsList.length;
      });
  }

  // goToAppointments() {
  //   this.posts = false;
  //   this.reviews = false;
  //   this.appointments = true;
  //   this.settings = false;
  // }

  // displayForm() {
  //   this.editable = true
  // }


  updatePassword(currentPassword, newPassword, confirmPassword) {
    console.log("sv details====>", this.spData)
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your fields',
      });
    }
    else if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    }
    else if (newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    }
    else {
      this.userServices.updatePassword( this.spData._id,currentPassword, newPassword, confirmPassword).subscribe((data) => {
        console.log("password data", data)
        if (data['err']) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data['err'],
          });
        }
        else {
          Swal.fire(
            '',
            data['success'],
            'success'
          );
        }
      })
    }
  
  }


  updateImage(imageUrl) {

    console.log("sv details====>", this.spData)
    console.log(imageUrl)
    
      this.userServices.updateUserImage(imageUrl, this.spData._id).subscribe((data) => {
        console.log("new data", data)
        this.spData.imageUrl = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        );
      })
  }


}
