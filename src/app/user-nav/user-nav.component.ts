import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
constructor(private router : Router,private http: HttpClient) {

}
  
  

  ngOnInit(): void {
    
  }
  logout(){
    this.http.get("http://localhost:3000/api/user/logout").subscribe((data) => {
      console.log('logout', data);
      localStorage.removeItem('token')
      localStorage.removeItem('svMail')
      localStorage.removeItem('id')
      Swal.fire(
        '',
        data["success"],
        'success'
      )
      this.router.navigateByUrl('/signin');
    })
  }
  tohome(){
    this.router.navigateByUrl("/userHome")
  }
  toservices(){
    this.router.navigateByUrl("/userServices")
  }
//  logout(){
//   localStorage.setItem("type" , "guest")
//  }
}
