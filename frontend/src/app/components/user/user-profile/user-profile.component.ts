import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../services/user service/user.service';
import { BlogEntriesPageable } from '../../../model/blog-entry.interface';
import { BlogService } from '../../../services/blog service/blog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private sub: Subscription | undefined;
  user$: Observable<User> | undefined;
  private userId$: Observable<number> | undefined;
  blogEntries$: Observable<BlogEntriesPageable> | undefined;

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private blogService: BlogService
  ){}

  ngOnInit(): void {
    this.userId$ = this.activatedRouter.params.pipe(
      map((params: Params) => parseInt(params['id']))
    );

    this.user$ = this.userId$.pipe(
      switchMap((userId: number) => this.userService.findOne(userId))
    );

    this.blogEntries$ = this.userId$.pipe(
      switchMap((userId: number) => this.blogService.indexByUser(userId, 1, 10))
    );
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

  onPaginateChange(event: PageEvent){
    return this.userId$?.pipe(
      tap((userId: number) => this.blogEntries$ = this.blogService.indexByUser(userId, event.pageIndex, event.pageSize))
    ).subscribe()
  }
}
