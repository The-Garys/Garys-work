import { Component, OnInit } from '@angular/core';import { LocalService } from "../local.service"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private local : LocalService) { }
role : string = this.local.role;
  ngOnInit() {
    
  }

}
