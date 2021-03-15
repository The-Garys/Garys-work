import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private http: HttpClient) { }

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
      // alert("please fill all the fields")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    }
    else if (password.length < 8) {
      // alert('your password must be at least 8 characters')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters'
      })
    }
    else if (password !== repeatedPassword) {
      // alert('make sure to confirm your password correctly')
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
    },{ responseType: 'text' }).subscribe((data) => {
      alert(data)
    console.log("data====>",data)
      // Swal.fire(
      //   'Good job!',
      //   'You are registred successfully',
      //   'success'
      // )
    })
    }

  }
}

