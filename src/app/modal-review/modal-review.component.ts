import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GaryService } from '../gary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss'],
})
export class ModalReviewComponent implements OnInit {
  constructor(
    config: NgbRatingConfig,
    private http: HttpClient,
    private GaryService: GaryService
  ) {
    config.max = 5;
    config.readonly = false;
  }
  currentRate: number = 0;
  myReview = {
    rate: this.currentRate,
    userId: 'idUser',
    spId: 'idSp',
    title: '',
    body: '',
  };
  ngOnInit(): void {}
  changeRate() {
    this.myReview.rate = this.currentRate;
    console.log(this.myReview);
  }
  addReview() {
    console.log('checking review', this.myReview);
  }
}
