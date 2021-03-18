import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalService } from '../../local.service'



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private http : HttpClient, private router : Router, private local : LocalService) { }
  email: string;
  password:string;


  ngOnInit(): void {
  }

  login(email, password) {
    this.http.post("http://localhost:3000/api/admin/login", {email: email, password: password}).subscribe((d) => {
      console.log(d);
      // this.router.navigateByUrl('/admin');
    })
  }

}
