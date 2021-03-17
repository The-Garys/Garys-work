import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {UserServiceProviderService} from '../user-service-provider.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  data: {
    firstName: any,
    lastName: any,
    userName: any,
    email: any,
    password: any,
    repeatedPassword: any,
    phoneNumber: any
  }
  // function register for sending a post request to the server
  register(
    firstName,
    lastName,
    userName,
    email,
    password,
    repeatedPassword,
    phoneNumber
  ) {
    if (!firstName || !lastName || !userName || !email || !password || !repeatedPassword || !phoneNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    }
    else if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters'
      })
    }
    else if (password !== repeatedPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly'
      })
    } else {
      this.http.post("http://localhost:3000/api/user/register" ,    { firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    },{ responseType: 'json' }).subscribe((data) => {
      console.log(data)
      if(data["err"]){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data["err"]
        })  
      }else {
       localStorage.setItem("token" , data["token"])
       this.router.navigateByUrl('/homeServices');
        Swal.fire(
          data["greet"] +" "+data["name"],
          data["success"],
          'success'
        )
      }
    })
    }

  }
}

