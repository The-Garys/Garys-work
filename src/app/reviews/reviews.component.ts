import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  data: { 
    serviceProviderName: any,
    userName: any,
    review: any
  }
  addReview(
    serviceProviderName,
    userName,
    review
  ){
    if(!serviceProviderName || !userName || !review){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    }
    else{
      this.http.post("http://localhost:3000/api/review/addReview",{
        serviceProviderName: serviceProviderName,
        userName: userName,
        review: review
      },{ responseType: 'json' }).subscribe((data)=>{
        console.log("review===>", data)
        Swal.fire(
          'Good job!',
          data["success"],
          'success'
        )
      })
    }

  }

}
