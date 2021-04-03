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
takeMeTo(profession: String){
  this.local.pick = profession
  this.router.navigateByUrl("userServices")
}
}
