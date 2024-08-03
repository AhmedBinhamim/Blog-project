import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
        ]],
        password: [null, [
          Validators.required,
          Validators.minLength(3),
          // CustomValidators.passwordContainsNumber
        ]],
        passwordConfirm: [ null, [Validators.required]]
      }), {
        // validators: CustomValidators.passwordMatches
      }
  }

}
