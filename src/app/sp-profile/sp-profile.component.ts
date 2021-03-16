import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  constructor() {}
token : string =   localStorage.getItem("token")
  ngOnInit(): void {
    console.log(this.token)
  }
  check: boolean = false;
  addClass() {
    this.check = true;
  }
}
