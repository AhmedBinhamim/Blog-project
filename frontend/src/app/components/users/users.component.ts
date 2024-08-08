import { Component, OnInit } from '@angular/core';
import { UserData, UserService } from '../../services/user.service';
import { map} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  dataSource: UserData | null = null;
  pageEvent: PageEvent | undefined;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(private userService: UserService){}

  ngOnInit(): void {    
   this.initDataSource();
  }

  initDataSource(){
    this.userService.findAll(1, 10).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent ){
    let page = event.pageIndex;
    let size = event.pageSize;

    page += 1;

    this.userService.findAll(page, size).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }
}
