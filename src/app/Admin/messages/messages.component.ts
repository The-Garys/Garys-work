import { Component, OnInit } from '@angular/core';
import {AdminMessagesService } from '../admin-messages.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private contactMessages : AdminMessagesService) { }

  messages =[];
  
  ngOnInit() {
    this.contactMessages.getMessages().subscribe((data: any[])=>{
      console.log(data);
      this.messages = data;
    })  
  }

    
  }



