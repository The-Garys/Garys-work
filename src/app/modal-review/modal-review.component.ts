import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  @Output()
  newReview = new EventEmitter<any>();
  constructor(
    config: NgbRatingConfig,
    private http: HttpClient,
    private GaryService: GaryService
  ) {
    config.max = 5;
    config.readonly = false;
  }
  currentRate: number = 0;
  halim: any;
  myReview = {
    serviceProviderEmail: localStorage.getItem('halimMail'),
    userName: localStorage.getItem('userName'),
    userId: localStorage.getItem('id'),
    rate: this.currentRate,
    reviewTitle: '',
    reviewBody: '',
  };
  ngOnInit(): void {}
  changeRate(r) {
    this.halim = this.currentRate;
    this.myReview.rate = this.currentRate;
    console.log('call', this.halim);
  }
  addReview() {
    console.log('checking review', this.myReview);

    this.GaryService.addReview(this.myReview).subscribe((data: any[]) => {
      console.log('is it working my friendoooo ====>', data);
      Swal.fire('Sent!', 'Your review has been sent seccessfully!', 'success');
      this.newReview.emit();
    });

    
  }
}
