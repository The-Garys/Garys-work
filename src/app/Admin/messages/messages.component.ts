import { Component, OnInit } from '@angular/core';
import {AdminServices } from '../admin.service'
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private contactMessages : AdminServices) { }

  messages =[];
  
  moment: any = moment;

  ngOnInit() {
    this.contactMessages.getMessages().subscribe((data: any[])=>{
      console.log(data);
      this.messages = data;
    })  
  }

deleteOne(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will permanently delete this message!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this.contactMessages.deleteMessage(id).subscribe((data):any => {
        this.messages = this.messages.filter(msg =>  msg._id !== id)
         }) 
    }
  })

}

deleteAll() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete All!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.contactMessages.deleteAll().subscribe(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
this.ngOnInit()    
  })
    
    }
  })
}
    
  }



