import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent {
  isSignIn: boolean = false;
  loginForm: FormGroup;
  loginSUB!: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if (!this.loginForm.valid) return;
    let signUp = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    if (this.isSignIn) {
      this.loginSUB = this.authService.signUp(signUp);
    } else {
      this.loginSUB = this.authService.login(signUp);
    }
    this.loginSUB.pipe(tap(console.log)).subscribe((res) => {
      this.router.navigate(['']);
    });
    this.loginForm.reset();
  }
}
