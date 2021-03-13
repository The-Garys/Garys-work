import { Component, OnInit } from '@angular/core';
declare var Rellax: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit()  {
    var rellax = new Rellax('.rellax');
  }
  scrollA() {
    console.log('clicked');
    
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  }
}
