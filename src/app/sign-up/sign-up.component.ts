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
      alert('please fill all the fields');
    } else if (password !== retypePassword) {
      alert('make sure to confirm your password correctly');
    } else if (password.length < 8) {
      alert('your password must be at least 8 characters');
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
          { responseType: 'text' }
        )
        .subscribe((data) => {
          alert(data);
        });
    }
  }
}
