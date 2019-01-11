import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Email } from './email.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  newEmail = new Email();
  password: string;
  submitted = false;

  constructor(public authService: AuthService) { }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.newEmail.email, this.password);
    this.newEmail.email = this.password = '';
  }

  googleLogin() {
    this.authService.googleLogin();
  }
}
