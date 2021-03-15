import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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
