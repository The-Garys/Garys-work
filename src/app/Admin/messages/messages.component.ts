import { Component, OnInit } from '@angular/core';
import {AdminMessagesService } from '../admin-messages.service'
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private contactMessages : AdminMessagesService) { }

  messages =[];
  
  moment: any = moment;

  ngOnInit() {
    this.contactMessages.getMessages().subscribe((data: any[])=>{
      console.log(data);
      this.messages = data;
    })  
  }

delete(id) {
  this.contactMessages.deleteMessage(id).subscribe((data):any => {
    this.messages = this.messages.filter(msg =>  msg._id !== id)
    
  })
}
    
  }



