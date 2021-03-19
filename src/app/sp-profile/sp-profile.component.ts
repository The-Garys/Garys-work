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
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GaryService } from '../gary.service';
import { LocalService } from "../local.service"
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor(
    private GaryService: GaryService,
    private http: HttpClient,
    private local: LocalService, private activatedroute: ActivatedRoute
  ) {}
  spData: any;
  data: any;
  token: string = localStorage.getItem('token');
  ngOnInit(): void {
      // this.activatedroute.data.subscribe(data => {
      //     console.log('my data in the Profile',data);
          
      // })
      console.log('my data in the Profile',history.state.data.id)



    console.log('helelews man', this.token);
    this.http
      .get(`http://localhost:3000/api/serviceProvider/profileData/${history.state.data.id}`)
      .subscribe((data) => {
        console.log('zdazdzazd', data);
        this.spData = data;
        console.log('name', this.spData);
        this.http
          .get(`http://localhost:3000/api/appointment/${data['firstName']}`)
          .subscribe((data) => {
            console.log('dzazdazadzda', data);
            this.data = data;
          });
      });
    console.log('boss', this.local.email);
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
