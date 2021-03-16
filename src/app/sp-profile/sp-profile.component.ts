// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sp-profile',
//   templateUrl: './sp-profile.component.html',
//   styleUrls: ['./sp-profile.component.scss']
// })
// export class SpProfileComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
  
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor(private GaryService: GaryService) {}
  token: string = localStorage.getItem('token');
  ngOnInit(): void {
    console.log('helelews man', this.token);
  }

  check: boolean = false;
  posts: boolean = true;
  reviews: boolean = false;
  settings: boolean = false;

  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
  }
  setting() {
    this.posts = false;
    this.reviews = false;
    this.settings = true;
  }
}
