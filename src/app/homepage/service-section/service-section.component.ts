import { Component, OnInit } from '@angular/core';
import { LocalService } from "../../local.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss']
})
export class ServiceSectionComponent implements OnInit {

  constructor(private local : LocalService , private router : Router) { }

  ngOnInit(): void {
  }
takeMeTo(a){
  this.local.pick = a
  this.router.navigateByUrl("userServices")
}
}
