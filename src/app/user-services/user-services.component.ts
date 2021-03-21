import { Component, OnInit } from '@angular/core';
import {SERVICES,NAME} from '../services-list/mock-service'
import { HttpClient } from '@angular/common/http';
import { LocalService } from "../local.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss']
})
export class UserServicesComponent implements OnInit {
  services : any =[]
  username: string;
  list : any = NAME
  data :any 
  backup : any = [] 
 
   constructor(private http: HttpClient , private local : LocalService , private router: Router) { }
 role : string = this.local.role
   ngOnInit(): void {
     console.log("dddddzadad" ,this.local.role )
 
     this.services=[] ;
     this.list=NAME
     this.http.get("http://localhost:3000/api/serviceProviderList/services").subscribe((data)=>{
       console.log("idhazd" , data)
       this.services=data
       this.backup = data 
     })
   }
 
   goSvProfile(svMail){
     console.log("profile email when click" , svMail)
     localStorage.setItem("svMail" , svMail)
     this.router.navigateByUrl('/spProfile')
   }
   getVal(val){
     console.log(val)
     this.services = this.backup
    var newArray = [] 
    this.services.map((e)=>{
     val = val.toUpperCase()
     var name = e.fullName.toUpperCase()
      if(name.includes(val)  ){
        newArray.push(e)
      }
    })
    this.services = newArray
   }
 
   dropVal(val){
     // console.log(val)
     this.services = this.backup
     if(val !== "all"){
       var newArr = [] 
       this.services.map((e)=>{
        val = val.toUpperCase()
        var name = e.profession.toUpperCase()
         if(name.includes(val)  ){
           newArr.push(e)
         }
       })
       this.services = newArr
     }
   }
 
   dropLoc(val){
     this.services = this.backup
     if(val !== "all"){
 
     var newArr = [] 
     this.services.map((e)=>{
      val = val.toUpperCase()
      var name = e.location.toUpperCase()
       if(name.includes(val)  ){
         newArr.push(e)
       }
     })
     this.services = newArr
   }
   }
   
 
 }
 