import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }
  myData: {
    firstName: any;
    lastName: any;
    fullName: any;
    email: any;
    password: any;
    phoneNumber: any;
    gender: any;
    profession: any;
    location: any;
  };
  getData(
    firstName,
    lastName,
    email,
    password,
    retypePassword,
    phoneNumber,
    gender,
    profession,
    location
  ) {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      retypePassword === '' ||
      phoneNumber === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    } else if (password !== retypePassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly'
      })
    } else if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters'
      })
    } else {
      this.http
        .post(
          'http://localhost:3000/api/serviceProvider/signup',
          {
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + ' ' + lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            gender: gender,
            profession: profession,
            location: location,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log(data)
          if (data["err"]) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data["err"]
            })
          } else {
            localStorage.setItem("token", data["token"])
            this.router.navigateByUrl('/spProfile');
            Swal.fire(
              'Good job!',
              data["success"],
              'success'
            )
          }
        });
    }
  }
}
