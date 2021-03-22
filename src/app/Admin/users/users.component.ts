import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {AdminServices} from '../admin.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  users: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private  usersList : AdminServices) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };
    this.usersList.getUsersList().subscribe((data) => {
      this.users = data;
      this.dtTrigger.next();

    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 ban(id) {
  this.usersList.banUser(id).subscribe((data) => {
    console.log(data, 'banned');
   
    
    
  })
 }

}
