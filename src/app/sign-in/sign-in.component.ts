import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  data: {
    
    email: any,
    password: any
  }
  login(email, password){
    if(!email || !password){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields'
      })
    }
    else{
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
