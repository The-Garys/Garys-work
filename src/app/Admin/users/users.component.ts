import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {AdminServices} from '../admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  users: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private  usersList : AdminServices) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };
    this.usersList.getUsersList().subscribe((data) => {
      this.users = data;
      this.dtTrigger.next();

    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 ban(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm Ban!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '',
        'User Is Banned!',
        'success'
      )
      this.usersList.banUser(id).subscribe((data) => {
        console.log(data, 'banned');
      })
    }
  })
 
 }
   
 unBan(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm Ban!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '',
        'User Is Unbanned',
        'success'
      )
      this.usersList.unbanUser(id).subscribe((data) => {
        console.log(data, 'unbanned');
        })
    }
  })
  
 }

}
