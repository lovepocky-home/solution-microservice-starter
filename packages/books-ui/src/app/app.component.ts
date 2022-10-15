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
    this.authService.logtoClient.signIn('http://localhost:14200/callback')
  }
  logout() {
    console.log('logout');
    this.authService.logtoClient.signOut('http://localhost:14200')
  }
}
