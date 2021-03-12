import { Component, OnInit } from '@angular/core';
import {SERVICES,NAME} from '../services-list/mock-service'

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
 services : any =SERVICES
 username: string;
 list : any = NAME
  constructor() { }

  ngOnInit(): void {
    this.services=SERVICES 
    this.list=NAME
  }
  getVal(val){
    console.log(val)
  this.ngOnInit()
   var newArray = [] 
   this.services.map((e)=>{
    val = val.toUpperCase()
    var name = e.firstName.toUpperCase()
     if(name.includes(val)  ){
       newArray.push(e)
     }
   })
   this.services = newArray
  }

  dropVal(val){
    console.log(val)
    this.ngOnInit()
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

  dropLoc(val){
    this.ngOnInit()
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
  


