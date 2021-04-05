import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsignup',
  templateUrl: './newsignup.component.html',
  styleUrls: ['./newsignup.component.scss']
})
export class NewsignupComponent implements OnInit {

  constructor() { }

   container : any   
  ngOnInit(): void {

    

    
  }

       signup(){
        document.querySelector(".container").classList.add("sign-up-mode");

       }
   
    
    signin(){
      document.querySelector(".container").classList.remove("sign-up-mode");
    }
  
}
