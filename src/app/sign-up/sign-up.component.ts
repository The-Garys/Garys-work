import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import bcrypt from 'bcryptjs';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  userData: object = {};

  getData(
    firstName,
    lastName,
    email,
    password,
    rePassword,
    phone,
    gender,
    profession,
    location
  ) {
    this.userData = {
      fullName: firstName + ' ' + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      rePassword: rePassword,
      phone: phone,
      gender: gender,
      profession: profession,
      location: location,
    };
    this.http
      .post('http://localhost:3000/halim', this.userData, {
        responseType: 'json',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
