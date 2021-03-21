import { Component, OnInit } from '@angular/core';
import {AdminServices} from '../admin.service'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  constructor(private spList : AdminServices) { }

  sps=[];
  firstName: any;

  ngOnInit(): void {
this.spList.getSpList().subscribe((data:any) => {
  
  this.sps = data;

  
})
  }

  Search() {
    if(this.firstName == '') {
      this.ngOnInit();
    }
    else {
      this.sps = this.sps.filter(res => {
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase())
      })
    }
  }

}
