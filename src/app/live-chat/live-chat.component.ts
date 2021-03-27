import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
import { LiveMessages } from './live-chat.service';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  socket;
  message;
  allMsg: any = [];
  constructor(private LiveMessages: LiveMessages) {}

  ngOnInit() {
    this.setupSocketConnection();
    this.getAllMessages();
  }
  getAllMessages() {
    this.LiveMessages.getAllMessages().subscribe((data: any[]) => {
      this.allMsg = data;
      console.log(' did our data came ? ==>', this.allMsg);
      console.log('this is our data ==>', data);
    });
  }
  sendMessage() {
    this.LiveMessages.sendAMessage(this.message).subscribe((data: any[]) => {
      console.log('is my message sent ? ===>', data);
    });
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
      }
    });
  }
  SendMessage() {
    this.socket.emit('message', this.message);
  }
}
