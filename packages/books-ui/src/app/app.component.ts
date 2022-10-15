import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'books-ui';

  constructor(private authService: AuthService) { }

  login() {
    console.log('login');
    this.authService.signIn()
  }
  logout() {
    console.log('logout');
    this.authService.signOut()
  }
}
