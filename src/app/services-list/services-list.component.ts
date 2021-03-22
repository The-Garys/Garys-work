import { Component, OnInit } from '@angular/core';
import {NAME} from '../services-list/mock-service'
import { HttpClient } from '@angular/common/http';
import { LocalService } from "../local.service"

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
 services : any =[]
 username: string;
 list : any = NAME
 data :any 
 backup : any = [] 
 location:any=NAME

  constructor(private http: HttpClient , private local : LocalService) { }
role : string = this.local.role
  ngOnInit(): void {
    console.log("dddddzadad" ,this.local.role )
    this.location=NAME
    this.services=[] ;
    this.list= []
    this.http.get("http://localhost:3000/api/professions/getProfessions").subscribe((data)=>{
      this.list=data
    })
    this.http.get("http://localhost:3000/api/serviceProviderList/services").subscribe((data)=>{
      console.log("idhazd" , data)
      this.services=data
      this.backup = data 
    })
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
   console.log("services",this.services)
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
    console.log(val)
    // this.services = this.backup
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