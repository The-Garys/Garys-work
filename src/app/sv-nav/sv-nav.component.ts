import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sv-nav',
  templateUrl: './sv-nav.component.html',
  styleUrls: ['./sv-nav.component.scss'],
})
export class SvNavComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}
  
  logout(){
    this.http.get("http://localhost:3000/api/serviceProvider/logout").subscribe((data) => {
      console.log('logout', data);
      localStorage.removeItem('token')
      localStorage.removeItem('svMail')
      Swal.fire(
        '',
        data["success"],
        'success'
      )
      this.router.navigateByUrl('/signin');
    })
  }
  tohome() {
    this.router.navigateByUrl('/userHome');
  }
  toservices() {
    this.router.navigateByUrl('/userServices');
  }
}
