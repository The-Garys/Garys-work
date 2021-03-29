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
imageUrl:string;
list:any;
  constructor(private adminServices : AdminServices,
    private profileServices : ProfileService,
    private serviceList : ServicesService) {}

  ngOnInit(): void {
   this.getProfessions() 
  }

  getProfessions() {
    this.serviceList.getProfessions()
      .subscribe((data) => {
        console.log("Services",data)
        this.list = data;
      });
  }
  addServices(profession){
    var services={
      profession:profession,
      image:this.imageUrl
    }
    this.adminServices.addService(services).subscribe((data)=>{
      console.log("hiiii",data)
      Swal.fire(
        'added!',
        'success'
      )
    })
    this.ngOnInit()
  }
  imgUpload(img) {
    console.log('IMG FROM VER==> ', img.target.files[0]);
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.profileServices.ImageUpload(formData).subscribe((resp) => {
      this.imageUrl = resp['msg'].url;
    });
  }
  updateImage(imageUrl) {
    console.log('sv details====>', this.list);
    console.log(imageUrl);

    this.adminServices.updateImage(imageUrl, this.list._id)
      .subscribe((data) => {
        console.log('new data', data);
        this.list.imageUrl = data['data'];
        Swal.fire('', data['success'], 'success');
      });
  }

}
