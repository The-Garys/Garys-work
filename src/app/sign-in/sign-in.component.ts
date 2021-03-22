import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private local: LocalService
  ) {}

  ngOnInit(): void {
    console.log(this.local.role);
  }
  data: {
    email: any;
    password: any;
  };
  serviceProviderIsChecked: any = false;

  checkProvider() {
    this.serviceProviderIsChecked = !this.serviceProviderIsChecked;
    console.log(this.serviceProviderIsChecked);
  }

  login(email, password) {
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else if (this.serviceProviderIsChecked) {
      this.http
        .post(
          'http://localhost:3000/api/serviceProvider/login',
          {
            email: email,
            password: password,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log(data);
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            console.log(data['token']);
            localStorage.setItem('token', data['token']);
            localStorage.setItem('svMail', data['email']);
            this.router.navigateByUrl('/spProfile', { state: { data } });
            Swal.fire(
              data['greet'] + ' ' + data['name'],
              data['success'],
              'success'
            );
            localStorage.setItem('visitor', 'no');
          }
        });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/user/login',
          {
            email: email,
            password: password,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log('why not ?', data);
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
            
          } 
          
          else if (data['isBanned']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account',
            });
          }
          else {
            this.local.changeRole('user');
            localStorage.setItem('token', data['token']);
            localStorage.setItem('id', data['id']);
            localStorage.setItem('userName', data['name']);

            this.router.navigateByUrl('/userServices');
            Swal.fire(
              data['greet'] + ' ' + data['name'],
              data['success'],
              'success'
            );
            localStorage.setItem('visitor', 'yes');
          }
        });
    }
  }
}
