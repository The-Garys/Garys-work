import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  userData: {
    firstName: any;
    lastName: any;
    email: any;
    password: any;
    rePassword: any;
    phone: any;
    gender: any;
    profession: any;
  };
  getVal(val) {
    console.log(val);
  }
  getData(
    firstName,
    lastName,
    email,
    password,
    rePassword,
    phone,
    gender,
    profession
  ) {
    this.http
      .post(
        'http://localhost:3000/halim',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          rePassword: rePassword,
          phone: phone,
          gender: gender,
          profession: profession,
        },
        { responseType: 'json' }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
