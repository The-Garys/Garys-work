import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  socket;
  message: string;
  constructor() {}

  ngOnInit(): void {
    this.setupSocketConnection();
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
