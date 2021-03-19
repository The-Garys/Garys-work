import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let tok = localStorage.getItem('token');
    console.log(tok);
  }
  scrollA() {
    console.log('clicked');

    document
      .querySelector('#about')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
