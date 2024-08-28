import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication service/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  
  constructor(
    private authService: AuthenticationService,
    private router: Router ,
  ) { }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.minLength(6)
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(3)
        ])
      })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => this.router.navigate(['admin']))
    ).subscribe();
  }
}
