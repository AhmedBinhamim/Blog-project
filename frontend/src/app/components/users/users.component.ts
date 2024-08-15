import { Component, OnInit } from '@angular/core';
import { UserData, UserService } from '../../services/user service/user.service';
import { map} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../services/authentication service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  filterValue: string | null = null;
  dataSource: UserData | null = null;
  pageEvent: PageEvent | undefined;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(private userService: UserService, private  router: Router, private activatedRoute: ActivatedRoute ){}

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

    if(this.filterValue == null){
      page += 1;

      this.userService.findAll(page, size).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    } else {
      this.userService.paginateByName(page, size, this.filterValue).pipe(
        map((userData: UserData) => this.dataSource = userData )
      ).subscribe()
    }

    
  }

  findByName(username: string){
    this.userService.paginateByName(0, 10, username).pipe(
      map((userData: UserData) => this.dataSource=userData)
    ).subscribe()
  }

  navigateToProfile(id: Number){
    this.router.navigate(['./'+ id], {relativeTo: this.activatedRoute})
  }
}
