import { Component, OnInit } from '@angular/core';
import { LocalService } from "../local.service";
import { LocalStorageService } from "../services/local-storage.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {ProfileService} from '../services/profile.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileImg :  any;
  constructor(
    private local : LocalService,
    private localStorageService: LocalStorageService,
    private router: Router, private service: ProfileService
    ) {
      router.events.subscribe(() => {
        this.refreshState()
      })
    }

  userId: String = "";
  serviceProviderEmail: String = "";

  refreshState() {
    this.serviceProviderEmail = this.getServiceProviderEmail();
    this.userId = this.getUserId();
    
  }

  getUserId() :String {
    return this.localStorageService.getItem("id")
  }

  getServiceProviderEmail() :String {
    return this.localStorageService.getItem("svMail")
  }

  logout() :void {
    // Logging out from user
    
    if (this.userId) {
      this.localStorageService.removeItem("id")
      this.localStorageService.removeItem("userName")
      this.localStorageService.removeItem("apUserName")
      this.localStorageService.removeItem("token")
      this.localStorageService.removeItem("halimMail")
      this.userId = "";
    }

    // Logging out from Service Provider
    if (this.serviceProviderEmail) {
      this.localStorageService.removeItem("svMail")
      this.localStorageService.removeItem("spEmail")
      this.localStorageService.removeItem("token")
      this.localStorageService.removeItem("halimMail")
      this.serviceProviderEmail = "";
    }
    Swal.fire(
      "",
      "You Are Logged Out!",
      'success'
    );
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    // console.log('slm', this.svEmail);
    this.refreshState();
    
    this.service.getServiceProviderData(this.serviceProviderEmail).subscribe((res) => {
      console.log('griiiiib' ,res);
         this.profileImg = res;
      console.log('bye',this.profileImg);
    
      
    })

  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

  redirectSp() {
    this.router.navigateByUrl('spProfile');
  }

}
