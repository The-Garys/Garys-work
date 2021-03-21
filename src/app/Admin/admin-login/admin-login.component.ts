import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private http : HttpClient, private router : Router) { }
  email: string;
  password:string;


  ngOnInit(): void {
  }

  login(email, password) {
    this.http.post("http://localhost:3000/api/admin/login", {email: email, password: password}, {responseType: 'json'}).subscribe((d) => {
      console.log(d);
      if (d['err']) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: d['err'],
        });
      }
      else{
        Swal.fire(
          '',
          'Successfully Connected!',
          'success'
        )
        this.router.navigateByUrl('/admin')
      }
      
    })
  }

}
