import { Component, OnInit } from '@angular/core';
import {SERVICES,NAME} from '../services-list/mock-service'
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.services=[] ;
    this.list=NAME
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
