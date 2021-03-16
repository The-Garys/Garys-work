import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gary-work';
  type : string 


  role:string;
  ngOnInit(){

    this.type = localStorage.getItem("type")
       console.log("this is type" , this.type)
  }
}
