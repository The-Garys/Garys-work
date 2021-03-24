import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from '../local.service';
import * as moment from 'moment';

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
  spPosts:any;
  notifications : number = 0
  editable:boolean = false
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  adress: string;
  previousPassword: string;
  currentPassword: string;
  confirmPassword: string;
  imageUrl : string
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
    });
      this.http.get("http://localhost:3000/api/posts").subscribe((data)=>{
        console.log("daaaaaaaataaa==>",data)
        this.spPosts=data
        this.spPosts = this.spPosts.reverse()
        for ( var i = 0; i < this.spPosts.length; i++ ) {
          this.spPosts[i].updatedAt = moment(
            this.spPosts[i].updatedAt
          ).format('LLL'); 
        }
      })
      
     
  }
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.http.post("http://localhost:3000/upload" , formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });}

 
 

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

  displayForm() {
    this.editable = true
  }
Add(title , description ,date  ){

  var adding = {
    title:title,
    description:description,
    date:date,
    image : this.imageUrl
    
  }
  if(title===""&& description===""&&date===""){
    alert("fill all inputs")
  }
  else{ this.http.post("http://localhost:3000/api/posts", adding ).subscribe((data)=>{
    Swal.fire(
      'added!',
      'success'
    )    
    this.ngOnInit();
  
  })
  
}
this.editable = false
}

deletePost(id){
   console.log(id)
   Swal.fire({
    title: 'Are you sure?',
    text: "You will permanently delete this post!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe((data)=>{
          Swal.fire(
        'Deleted!',
        'Your post has been deleted.',
        'success'
      )
      this.ngOnInit()
      
    })
  }
  })
}
 

  updateFirstName(firstName){
    
    console.log("sv details====>",this.spData)
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
    this.changable5 = false
  }


}
