import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { GaryService } from '../gary.service';
import { HttpClient } from '@angular/common/http';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sp-profile-user-side',
  templateUrl: './sp-profile-user-side.component.html',
  styleUrls: ['./sp-profile-user-side.component.scss'],
})
export class SpProfileUserSideComponent implements OnInit {
  constructor(
    private GaryService: GaryService,
    private http: HttpClient,
    private local: LocalService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }
  spData: any;
  data: any;
  token: string = localStorage.getItem('token');
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
