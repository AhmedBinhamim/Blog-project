import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../services/user service/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userId: number | null = null;
  private sub: Subscription | undefined;
  user: User | null = null;


  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService
  ){}

  ngOnInit(): void {
      this.sub = this.activatedRouter.params.subscribe(params => {
        this.userId = parseInt(params['id']);
        this.userService.findOne(this.userId).pipe(
          map((user:User) => this.user = user)
        ).subscribe()
      })
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}
