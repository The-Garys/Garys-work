import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit(): void {
  }
  data: {
    
    email: any,
    password: any
  }
 userIsChecked: any= false
 serviceProviderIsChecked: any=false

 checkProvider(a){
   if(a){
    this.userIsChecked = false
    this.serviceProviderIsChecked= true
   } else {
    this.userIsChecked = true
    this.serviceProviderIsChecked= false
   }


 }
  login(email, password){
    if(!email || !password){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    }
    else if(this.userIsChecked){
      this.http.post("http://localhost:3000/api/user/login" ,    {
      email: email,
      password: password,
    },{ responseType: 'json' }).subscribe((data) => {
    console.log(data)
    if(data["err"]){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data["err"]
      })  
    }else {
     localStorage.setItem("token" , data["token"])
     localStorage.setItem("type" , "user" )
     
     this.router.navigateByUrl('/homePage');
      Swal.fire(
        'Good job!',
        data["success"],
        'success'
      )
    }

    })
    }
    else if(this.serviceProviderIsChecked){
      this.http.post("http://localhost:3000/api/serviceProvider/login" ,    {
      email: email,
      password: password,
    },{ responseType: 'json' }).subscribe((data) => {
    console.log(data)
    if(data["err"]){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data["err"]
      })  
    }else {
     localStorage.setItem("token" , data["token"])
     this.router.navigateByUrl('/spProfile');
      Swal.fire(
        'Good job!',
        data["success"],
        'success'
      )
    }

    })
    }
  }

}
