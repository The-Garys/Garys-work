import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  submit(name , email , date , svname ){ 
    if(!name || !email || !date || !svname) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    } else {
      this.http.post("http://localhost:3000/api/appointment",
      {userName : name , email : email , date : date , serviceProviderName : svname}).subscribe((data)=>{
       Swal.fire({
         icon: 'success',
         title: 'Appointment added successfully',
         showConfirmButton: false,
         timer: 1500
       })
       })
   
   
      console.log({name : name , email : email , date : date , svname : svname})
    }
  
 }
}
