import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  constructor(private http: HttpClient, private local: LocalService) {}
  data: any;
  ngOnInit(): void {
    this.http
      .get(`http://localhost:3000/api/appointment/${this.local.email}`)
      .subscribe((data) => {
        this.data = data;
      });
  }
  submit(name, email, date, svname, time) {
    if (!name || !email || !date || !svname || !time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    } else {
      this.http
        .post('http://localhost:3000/api/appointment', {
          userName: name,
          email: email,
          date: date,
          serviceProviderName: svname,
          time: time,
        })
        .subscribe((data) => {
          if (data['data']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Not available!',
              footer: '<a href>Why do I have this issue?</a>',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Appointment added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  }
}
