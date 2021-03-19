import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }
  imageUrl : string
  list : any
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.http.post("http://localhost:3000/upload" , formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
    this.list= []
    this.http.get("http://localhost:3000/api/professions/getProfessions").subscribe((data)=>{
      this.list=data
    })
  }
  getData(
    firstName,
    lastName,
    email,
    password,
    retypePassword,
    phoneNumber,
    gender,
    profession,
    location,
    imageUrl
  ) {
    if(!imageUrl && gender === "Male" ){
      imageUrl = "https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
    } 
    if(!imageUrl && gender === "Female" ){
      imageUrl = "https://mpng.subpng.com/20180326/wzw/kisspng-computer-icons-user-profile-avatar-female-profile-5ab915f791e2c1.8067312315220792235976.jpg"
    }

    
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      retypePassword === '' ||
      phoneNumber === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else if (password !== retypePassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/serviceProvider/signup',
          {
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + ' ' + lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            gender: gender,
            profession: profession,
            location: location,
            imageUrl: imageUrl
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log(data)
          if (data["err"]) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data["err"]
            })
          } else {
            localStorage.setItem("token", data["token"])
            this.router.navigateByUrl('/spProfile');
            Swal.fire(
              data["greet"] +" "+data["name"],
              data["success"],
              'success'
            )
          }
        });
    }
  }
}
