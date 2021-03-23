import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
// import { Router } from '@angular/router';
// import {ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';
// import { data } from 'jquery';
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
  ) { }
  // boli : boolean = false 
  // obj : any = { name : "halim" , last : "boussada" , job : "hir"}
  name: any = localStorage.getItem("apUserName")
  spData: any;
  data: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  notifications: number = 0
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  adress: string;
  previousPassword: string;
  currentPassword: string;
  confirmPassword: string;
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
        console.log('ali====>', data);
        this.spData = data;
        // console.log("getting me ddddd", this.data['_id']);
        // this.http
        // .get(
        //   `http://localhost:3000/api/appointment/${this.spData._id}`
        // )
        // .subscribe((data) => {
        //   this.data = data;
        //   this.notifications = this.data.length
        // });

      });
    // console.log('local email', this.local.email);
    // console.log("hiiiiii")
    // setTimeout(() =>{
    //   console.log("data=====>", this.spData)
    // },5000)
    // console.log(this.spData._id)

  }

  // up(){
  //   this.boli = !this.boli
  // }
  // save(n , l , j){
  //   this.obj = { name : n , last : l , job : j }
  //   this.up()
  // }
  submit(date, time) {

    var obj = { userName: this.name, email: this.spData.email, serviceProviderName: this.spData._id, date: date, time: time }
    console.log(obj.serviceProviderName)
    var c = {
      date: date,
      time: time,
      userName: this.name,
      email: this.spData.email,
      serviceProviderName: this.spData._id
    }
    if (!date || !time) {
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
  appointments: boolean = false;
  changable: boolean = false;
  changable1: boolean = false;
  changable2: boolean = false;
  changable3: boolean = false;
  changable4: boolean = false;
  changable5: boolean = false;
  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
    this.appointments = false;

  }
  setting() {


    this.posts = false;
    this.reviews = false;
    this.settings = true;
    this.appointments = false



  }
  displayInput() {
    this.changable = true;
  }
  displayInput1() {
    this.changable1 = true;
  }
  displayInput2() {
    this.changable2 = true;
  }
  displayInput3() {
    this.changable3 = true;
  }
  displayInput4() {
    this.changable4 = true;
  }
  displayInput5() {
    this.changable5 = true;
  }
  appointment() {
    console.log("spdat===>", this.spData._id);
    this.http
      .get(`http://localhost:3000/api/appointment/${this.spData._id}`)
      .subscribe((data) => {
        console.log('dzdazdazda ', data);
        this.data = data;
        this.notifications = this.data.length
        this.posts = false;
        this.reviews = false;
        this.appointments = true;
        this.settings = false;
      });
  }
  updateFirstName(firstName) {

    console.log("sv details====>", this.spData)
    console.log(firstName)
    if (!firstName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new first name',
      });
    }
    else {
      this.http.put(`http://localhost:3000/api/serviceProvider/updateFirstName/${this.spData._id}`, {
        firstName: firstName
      }, { responseType: 'json' }).subscribe((data) => {
        console.log("new data", data)
        this.spData.firstName = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        );
      })
      // this.ngOnInit()
    }
    this.changable = false
  }
  updateLastName(lastName) {

    console.log("sv details====>", this.spData)
    console.log(lastName)
    if (!lastName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new last name',
      });
    }
    else {
      this.http.put(`http://localhost:3000/api/serviceProvider/updateLastName/${this.spData._id}`, {
        lastName: lastName
      }, { responseType: 'json' }).subscribe((data) => {
        console.log("new data", data)
        this.spData.lastName = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        );
      })
      // this.ngOnInit()
    }
    this.changable1 = false
  }

  updateFullName(fullName) {

    console.log("sv details====>", this.spData)
    console.log(fullName)
    if (!fullName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new last name',
      });
    }
    else {
      this.http.put(`http://localhost:3000/api/serviceProvider/updateFullName/${this.spData._id}`, {
        fullName: fullName
      }, { responseType: 'json' }).subscribe((data) => {
        console.log("new data", data)
        this.spData.fullName = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        );
      })
      // this.ngOnInit()
    }
    this.changable2 = false
  }

  updateEmail(email) {

    console.log("sv details====>", this.spData)
    console.log(email)
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new email',
      });
    }
    else {
      this.http.put(`http://localhost:3000/api/serviceProvider/updateEmail/${this.spData._id}`, {
        email: email
      }, { responseType: 'json' }).subscribe((data) => {
        console.log("new data", data)
        if (data["err"]) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data['err'],
          });
        }
        else {
          localStorage.setItem("svMail", data["data"])
          Swal.fire(
            '',
            data['success'],
            'success'
          );
          this.spData.email = data['data']
        }
      })
      // this.ngOnInit()
    }
    this.changable3 = false
  }

  updateAdress(adress) {

    console.log("sv details====>", this.spData)
    console.log(adress)
    if (!adress) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new adress',
      });
    }
    else {
      this.http.put(`http://localhost:3000/api/serviceProvider/updateAdress/${this.spData._id}`, {
        adress: adress
      }, { responseType: 'json' }).subscribe((data) => {
        console.log("new data", data)
        this.spData.adress = data['data']
        Swal.fire(
          '',
          data['success'],
          'success'
        );
      })
      // this.ngOnInit()
    }
    this.changable4 = false

  }

  updatePassword(previousPassword, currentPassword, confirmPassword) {
    console.log("sv details====>", this.spData)
    if (!previousPassword || !currentPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your fields',
      });
    }
    else if (currentPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    }
    else if (currentPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    }
    else {
      this.http.patch(`http://localhost:3000/api/serviceProvider/updatePassword/${this.spData._id}`, { currentPassword: currentPassword, previousPassword: previousPassword, confirmPassword: confirmPassword }, { responseType: 'json' }).subscribe((data) => {
        console.log("password data", data)
        if (data['err']) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data['err'],
          });
        }
        else {
          // this.spData.password = data['data']
          Swal.fire(
            '',
            data['success'],
            'success'
          );
        }
      })
    }
  }

}
