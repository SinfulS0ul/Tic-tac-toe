import { Component } from '@angular/core';
import { GameService } from './game.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {
  constructor(public authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
