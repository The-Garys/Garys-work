// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sp-profile',
//   templateUrl: './sp-profile.component.html',
//   styleUrls: ['./sp-profile.component.scss']
// })
// export class SpProfileComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from "../local.service"
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor(private GaryService: GaryService , private http : HttpClient , private local : LocalService) {}
  userdata : any
  data:any;
  token: string = localStorage.getItem('token');
  ngOnInit(): void {
    console.log('helelews man', this.token);
    this.http.post("http://localhost:3000/api/serviceProvider/profileData" , {token : this.token}).subscribe((data)=>{
      console.log("zdazdzazd", data)
      this.userdata = data
      console.log('name' , this.userdata)
    
      this.http.get(`http://localhost:3000/api/appointment/${data["firstName"]}`).subscribe((data)=>{
        console.log("dzazdazadzda",data)
        this.data = data
        })

        
    }) 
    console.log("boss" ,this.local.email)
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
        if(data["data"]) {
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
}
