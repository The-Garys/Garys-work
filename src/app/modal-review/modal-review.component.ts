import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GaryService } from '../gary.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from "../services/local-storage.service";
import { ProfileService } from '../services/profile.service';
import { data } from 'jquery';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss'],
})
export class ModalReviewComponent implements OnInit {
 
  @Output()
  newReview = new EventEmitter<any>();
  @Input() spReviews: any
  constructor(
    config: NgbRatingConfig,
    private http: HttpClient,
    private GaryService: GaryService,
    private localStorageService: LocalStorageService,
    private profileServices: ProfileService
  ) {
    config.max = 5;
    config.readonly = false;
  }
  userId: String;
  serviceProviderEmail: String;

  currentRate: number = 0;
  halim: any;
  myReview = {
    serviceProviderEmail: this.localStorageService.getItem('halimMail'),
    userName: this.localStorageService.getItem('userName'),
    userId: this.localStorageService.getItem('id'),
    rate: this.currentRate,
    reviewTitle: '',
    reviewBody: '',
  };
  ngOnInit(): void {
    this.userId = this.localStorageService.getItem('id');
    this.serviceProviderEmail = this.localStorageService.getItem('svMail');
    
   console.log("these are reviews", this.spReviews)

  }
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
