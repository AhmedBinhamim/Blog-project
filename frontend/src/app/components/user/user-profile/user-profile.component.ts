import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../services/user service/user.service';
import { BlogEntriesPageable } from '../../../model/blog-entry.interface';
import { BlogService } from '../../../services/blog service/blog.service';
import { PageEvent } from '@angular/material/paginator';
import { WINDOW } from '../../../window-token';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  origin: string = '';
  
  private sub: Subscription | undefined;
  user$: Observable<User> | undefined;
  private userId$: Observable<number> | undefined;
  blogEntries$: Observable<BlogEntriesPageable> | undefined;

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private blogService: BlogService,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    if (isPlatformBrowser(this.platformId)) {
      this.origin = this.window.location.origin;
    }
  }

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
    ).subscribe();
  }
}
