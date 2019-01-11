import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent  {

  constructor(public router: Router, public authService: AuthService) { }
  goToLogIn () {
    this.router.navigate(['/login']);
  }
  goToSignUp () {
    this.router.navigate(['/signup']);
  }
}
