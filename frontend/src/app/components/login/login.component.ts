import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent  {
  
  constructor(private authService: AuthenticationService) { }
  
  login(){
    this.authService.login('ahmed@gmail.com', 'password' ).subscribe(data => console.log('success'));
  }  
}
