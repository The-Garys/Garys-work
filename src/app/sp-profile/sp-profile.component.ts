import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { LocalService } from '../local.service';
import * as moment from 'moment';
import { ProfileService } from '../services/profile.service';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
import { LiveMessages } from '../live-chat/live-chat.service';
// import { Router } from '@angular/router';
// import {ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.scss'],
})
export class SpProfileComponent implements OnInit {
  socket;
  message = {
    messageBody: '',
    userId: localStorage.getItem('id'),
    spId: localStorage.getItem('halimMail'),
    isSp: !false,
  };
  isChatClicked: boolean = false;
  allMsg: any = [];
  sendedMessages: any = [];
  recievedMessages: any = [];
  constructor(
    private LiveMessages: LiveMessages,
    private http: HttpClient,
    private local: LocalService,
    private profileServices: ProfileService
  ) {}
  name: any = localStorage.getItem('apUserName');
  spData: any;
  appointmentsList: any;
  token: string = localStorage.getItem('token');
  spEmail: string;
  visitor: boolean = false;
  visitor1: boolean = false;
  svMail: string;
  spPosts: any;
  notifications: number = 0;
  editable: boolean = false;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  adress: string;
  previousPassword: string;
  currentPassword: string;
  confirmPassword: string;
  imageUrl: string;
  currentConversation: any = [];
  ngOnInit(): void {
    if (localStorage.getItem('visitor') === 'yes') {
      this.visitor = true;
      this.visitor1 = false;
    } else {
      this.visitor = false;
      this.visitor1 = true;
    }
    // this.spEmail = localStorage.getItem('spEmail');
    this.svMail = localStorage.getItem('svMail');

    this.profileServices
      .getServiceProviderData(this.svMail)
      .subscribe((data) => {
        console.log('ali====>', data);
        this.spData = data;
        this.getAppointments();
        this.profileServices
          .getServiceProviderPosts(this.spData._id)
          .subscribe((data) => {
            console.log('daaaaaaaataaa==>', data);
            this.spPosts = data;
            this.spPosts = this.spPosts.reverse();
            for (var i = 0; i < this.spPosts.length; i++) {
              this.spPosts[i].updatedAt = moment(
                this.spPosts[i].updatedAt
              ).format('LLL');
            }
          });
      });
    this.setupSocketConnection();
    this.getAllMessages();
  }
  getConversation() {
    this.LiveMessages.getConversation(
      this.message.spId,
      this.message.userId
    ).subscribe((data: any[]) => {
      this.currentConversation = data;
    });
  }
  getAllMessages() {
    this.LiveMessages.getAllMessages().subscribe((data: any[]) => {
      this.allMsg = data;
      console.log(' did our data came ? ==>', this.allMsg);
      console.log('this is our data ==>', data);
      for (var i = 0; i < this.allMsg.length; i++) {
        this.allMsg[i].createdAt = moment()
          .add(this.allMsg[i].createdAt)
          .calendar();
      }
    });
  }
  changeChatClick() {
    this.isChatClicked = !this.isChatClicked;
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string = this.allMsg) => {
      if (data) {
        this.getAllMessages();
        console.log('is it working this way ?? ==>', data);
      }
    });
  }
  SendMessage() {
    this.socket.emit('message', this.message.messageBody);

    this.LiveMessages.sendAMessage(this.message).subscribe((response) => {
      console.log('is my message sent ? ===>', response);
      this.getAllMessages();
    });
    this.message.messageBody = '';
  }
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
  }

  submit(date, time) {
    var c = {
      date: date,
      time: time,
      userName: this.name,
      email: this.spData.email,
      serviceProviderName: this.spData._id,
    };

    if (!date || !time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    } else {
      this.profileServices.submitAppointment(c).subscribe((data) => {
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

  check: boolean = false;
  posts: boolean = true;
  reviews: boolean = false;
  settings: boolean = false;
  appointments: boolean = false;
  changable: boolean = false;
  changable1: boolean = false;
  changable2: boolean = false;
  changable3: boolean = false;
  changable4: boolean = false;
  changable5: boolean = false;
  post() {
    this.posts = true;
    this.reviews = false;
    this.settings = false;
    this.appointments = false;
  }
  review() {
    this.posts = false;
    this.reviews = true;
    this.settings = false;
    this.appointments = false;
  }
  setting() {
    this.posts = false;
    this.reviews = false;
    this.settings = true;
    this.appointments = false;
  }
  displayInput() {
    this.changable = true;
  }
  displayInput1() {
    this.changable1 = true;
  }
  displayInput2() {
    this.changable2 = true;
  }
  displayInput3() {
    this.changable3 = true;
  }
  displayInput4() {
    this.changable4 = true;
  }
  displayInput5() {
    this.changable5 = true;
  }
  getAppointments() {
    console.log('spdat===>', this.spData._id);
    this.profileServices
      .getSericeProviderAppointments(this.spData._id)
      .subscribe((data) => {
        console.log('dzdazdazda', data);
        this.appointmentsList = data;
        this.notifications = this.appointmentsList.length;
      });
  }

  goToAppointments() {
    this.posts = false;
    this.reviews = false;
    this.appointments = true;
    this.settings = false;
  }

  displayForm() {
    this.editable = true;
  }
  Add(title, description, date, id) {
    var adding = {
      title: title,
      description: description,
      date: date,
      image: this.imageUrl,
      spId: id,
    };
    if (title === '' && description === '' && date === '') {
      alert('fill all inputs');
    } else {
      this.profileServices.addPost(adding).subscribe((data) => {
        Swal.fire('added!', 'success');
        this.ngOnInit();
      });
    }
    this.editable = false;
  }

  deletePost(id) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will permanently delete this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileServices.deletePost(id).subscribe((data) => {
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
          this.ngOnInit();
        });
      }
    });
  }

  updateFirstName(firstName) {
    console.log('sv details====>', this.spData);
    console.log(firstName);
    if (!firstName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new first name',
      });
    } else {
      this.profileServices
        .updateFirstName(firstName, this.spData._id)
        .subscribe((data) => {
          console.log('new data', data);
          this.spData.firstName = data['data'];
          Swal.fire('', data['success'], 'success');
        });
    }
    this.changable = false;
    this.firstName = '';
  }
  updateLastName(lastName) {
    console.log('sv details====>', this.spData);
    console.log(lastName);
    if (!lastName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new last name',
      });
    } else {
      this.profileServices
        .updateLastName(lastName, this.spData._id)
        .subscribe((data) => {
          console.log('new data', data);
          this.spData.lastName = data['data'];
          Swal.fire('', data['success'], 'success');
        });
    }
    this.changable1 = false;
    this.lastName = '';
  }
  displayChat() {
    document.getElementById('chat-comp').style.display = 'flex';
  }

  updateFullName(fullName) {
    console.log('sv details====>', this.spData);
    console.log(fullName);
    if (!fullName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new last name',
      });
    } else {
      this.profileServices
        .updateFullName(fullName, this.spData._id)
        .subscribe((data) => {
          console.log('new data', data);
          this.spData.fullName = data['data'];
          Swal.fire('', data['success'], 'success');
        });
      // this.ngOnInit()
    }
    this.changable2 = false;
    this.fullName = '';
  }

  updateEmail(email) {
    console.log('sv details====>', this.spData);
    console.log(email);
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new email',
      });
    } else {
      this.profileServices
        .updateEmail(email, this.spData._id)
        .subscribe((data) => {
          console.log('new data', data);
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            localStorage.setItem('svMail', data['data']);
            Swal.fire('', data['success'], 'success');
            this.spData.email = data['data'];
          }
        });
      // this.ngOnInit()
    }
    this.changable3 = false;
    this.email = '';
  }

  updateAdress(adress) {
    console.log('sv details====>', this.spData);
    console.log(adress);
    if (!adress) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your new adress',
      });
    } else {
      this.profileServices
        .updateAdress(adress, this.spData._id)
        .subscribe((data) => {
          console.log('new data', data);
          this.spData.adress = data['data'];
          Swal.fire('', data['success'], 'success');
        });
      // this.ngOnInit()
    }
    this.changable4 = false;
    this.adress = '';
  }

  updatePassword(previousPassword, currentPassword, confirmPassword) {
    console.log('sv details====>', this.spData);
    if (!previousPassword || !currentPassword || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter your fields',
      });
    } else if (currentPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    } else if (currentPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    } else {
      this.profileServices
        .updatePassword(
          previousPassword,
          currentPassword,
          confirmPassword,
          this.spData._id
        )
        .subscribe((data) => {
          console.log('password data', data);
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            Swal.fire('', data['success'], 'success');
          }
        });
    }
    this.changable5 = false;
    this.previousPassword = '';
    this.currentPassword = '';
    this.confirmPassword = '';
  }

  updateImage(imageUrl) {
    console.log('sv details====>', this.spData);
    console.log(imageUrl);

    this.profileServices
      .updateImage(imageUrl, this.spData._id)
      .subscribe((data) => {
        console.log('new data', data);
        this.spData.imageUrl = data['data'];
        Swal.fire('', data['success'], 'success');
      });
  }
}
