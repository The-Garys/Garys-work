import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {AdminServices} from '../admin.service'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  sps: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private spList : AdminServices) { }

  
 

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
this.spList.getSpList().subscribe((data:any) => {
  
  this.sps = data;
  this.dtTrigger.next();

  
})
  }
   
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
