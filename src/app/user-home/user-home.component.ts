import { Component, OnInit } from '@angular/core';
declare var Rellax: any;
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor() { }

  ngOnInit()  {
    var rellax = new Rellax('.rellax');
  }
  scrollA() {
    console.log('clicked');
    
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  }
}
