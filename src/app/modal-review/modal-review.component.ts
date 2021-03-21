import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss'],
})
export class ModalReviewComponent implements OnInit {
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
  }
  myReview = {
    id: '',
    title: '',
    body: '',
  };
  currentRate: number = 0;
  ngOnInit(): void {
    console.log(this.myReview);
  }
  sendReview() {}
}