import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {AdminServices } from '../admin.service'
import { ProfileService } from '../../services/profile.service'
import {ServicesService} from '../../services/services.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']        
})
export class ProfessionsComponent implements OnInit {
image:string;
services:Array<Object> = [];
profession:String;
id : any 
img : any 
pro : any 
  constructor(private adminServices : AdminServices,
    private profileServices : ProfileService,
    private servicesService : ServicesService) {}

  ngOnInit(): void {
   this.getProfessions() 
  //  this.addServices()
  }

  getProfessions() {
    this.servicesService.getProfessions()
      .subscribe((data: Object[]) => {
        this.services = data;
      });
  }
   takeID(id , img , pro){
     this.id = id 
     this.img  = img 
     this.pro = pro
   }
  addServices(profession){
    var services={
      profession:profession,
      image:this.image
    }
    this.adminServices.addService(services).subscribe((data)=>{
      console.log("hiiii",data)
      Swal.fire(
        'added!',
        'success'
      )
       this.ngOnInit()
       this.profession=""
    })
   
  }
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.image = resp['msg'].url;
      this.img = resp['msg'].url
    });
  }
  openUpdateModal(s) {
    console.log('liiist',this.image , s , this.id);
    if(s !== this.pro){
      this.pro = s 
    } 
   
    this.adminServices.updateImageandService(this.id ,this.img,this.pro)
      .subscribe((data) => {
        console.log('new datgftta', data);
        this.services = data['data'];
        Swal.fire('', data['success'], 'success');
        this.ngOnInit()
      });
  }

}
