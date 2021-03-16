import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  disconnect(){
    localStorage.setItem("token" , "")
    localStorage.setItem("type" , "")
    this.router.navigateByUrl('/userSignup');
  }
}
