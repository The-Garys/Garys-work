import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { UserProfileService } from '../services/user-profile.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private userServices: UserProfileService
  ) {}

  userData: any;
  appointmentsList: any;
  userId: string;
  notifications: number = 0;
  editable: boolean = false;
  firstName: string;
  lastName: string;
  userName: string;
  loc: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  imageUrl : string ;
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.userServices.getUserData(this.userId).subscribe((data) => {
      console.log('user data====>', data);
      this.userData = data;
      this.imageUrl = data["imageUrl"]
      this.getAppointments();
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

  updateUserDetails(firstName, lastName, userName, phoneNumber, loc) {
    this.userServices
      .updateUserData(
        this.userData._id,
        firstName,
        lastName,
        userName,
        phoneNumber,
        loc
      )
      .subscribe((data) => {
        console.log('newData', data);
        this.userData = data['data'];
        Swal.fire('', data['success'], 'success');
      });
  }
  getAppointments() {
    console.log('spdat===>', this.userData._id);
    this.userServices
      .getUserAppointments(this.userData._id)
      .subscribe((data) => {
        console.log('dzdazdazda', data);
        this.appointmentsList = data;
        this.notifications = this.appointmentsList.length;
      });
  }
  cancelAppointment(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will cancel this appointment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Canceled!',
          'Your appointment has been Canceled.',
          'success'
        );
        this.http
          .delete('http://localhost:3000/api/appointment/cancel/' + id)
          .subscribe((data) => {
            console.log('is it deleted ??? =+>', data);
            this.ngOnInit();
            console.log(
              'did our appointement canceled ? ==>',
              this.appointmentsList
            );
            this.getAppointments();
          });
      }
    });
  }
  deleteNotification(id) {
    this.http
      .delete('http://localhost:3000/api/appointment/cancel/' + id)
      .subscribe((data) => {
        console.log('is it deleted ??? =+>', data);
        this.ngOnInit();
        console.log(
          'did our appointement canceled ? ==>',
          this.appointmentsList
        );
        this.getAppointments();
      });
  }
  goToAppointments() {
    this.appointments = true;
    this.settings = false;
    this.Security = false;
  }

  updatePassword(currentPassword, newPassword, confirmPassword) {
    console.log('sv details====>', this.userData);
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your fields',
      });
    } else if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    } else if (newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    } else {
      this.userServices
        .updatePassword(
          this.userData._id,
          currentPassword,
          newPassword,
          confirmPassword
        )
        .subscribe((data) => {
          console.log('password data', data);
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            Swal.fire('', data['success'], 'success');
          }
        });
    }
  }

  updateImage(imageUrl) {
    console.log('sv details====>', this.userData);
    console.log(imageUrl);

    console.log("sv details====>", this.userData)
    console.log(imageUrl)
    
      this.userServices.updateUserImage(imageUrl, this.userData._id).subscribe((data) => {
        console.log("new data", data)
        this.userData.imageUrl = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        ).then(()=>{
          window.location.reload();
        });
        
      })
  }
}
