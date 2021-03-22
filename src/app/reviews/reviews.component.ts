import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { GaryService } from '../gary.service';
import * as moment from 'moment';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers: [NgbRatingConfig],
})
export class ReviewsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    config: NgbRatingConfig,
    private GaryService: GaryService
  ) {
    config.max = 5;
    config.readonly = true;
  }
  spReviews: any;
  spEmail: string = localStorage.getItem('svMail');
  isUser: string = localStorage.getItem('visitor');
  currentRate: number;

  ngOnInit(): void {
    this.GaryService.getReviews(this.spEmail).subscribe((data) => {
      console.log('those are my reviews ==> ', data);
      this.spReviews = data;
      var totalReview = 0;
      for (var i = 0; i < this.spReviews.length; i++) {
        this.spReviews[i].updatedAt = moment(
          this.spReviews[i].updatedAt
        ).format('LLL');
        totalReview += this.spReviews[i].rate;
      }
      this.currentRate = totalReview / this.spReviews.length;
      console.log(totalReview);
      console.log(this.spReviews.length);

      console.log(this.currentRate);

      console.log('3adeha lel varrrrrrrrrrr ==> ', this.spReviews);
    });
  }

  addReview(serviceProviderName, userName, review) {
    if (!serviceProviderName || !userName || !review) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/review/addReview',
          {
            serviceProviderName: serviceProviderName,
            userName: userName,
            review: review,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log('review===>', data);
          Swal.fire('Good job!', data['success'], 'success');
        });
    }
  }
}
