import { Component } from '@angular/core';
import { LocalService } from "./local.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private local : LocalService) {
  }
     
  role : string = this.local.role;
  ngOnInit() {
  
  }
  title = 'gary-work'
  
}
