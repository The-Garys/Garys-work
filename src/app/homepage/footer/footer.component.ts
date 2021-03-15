import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private http: HttpClient) {}
  name:String;
  phone:Number;
  email:String;
  message:String;

  ngOnInit(): void {}
send(name,phone, email, message) {
  this.http.post("http://localhost:3000/api/contactus" ,    {
  name: name,
  phone: phone,
  email: email,
  message: message
},
{ responseType: 'text' }).subscribe((data) => {alert(data)})
}
  
}

