import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor() { }

  ngOnInit()  {
    let tok = localStorage.getItem('token');
    console.log(tok);
    
    
  }
  scrollA() {
    console.log('clicked');
    
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  }
}
