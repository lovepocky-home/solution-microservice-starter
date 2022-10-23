import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'books-ui';

  constructor(public authService: AuthService, private http: HttpClient, private backend: BackendService) {
    // @ts-ignore
    window.http = http
  }

  login() {
    console.log('login');
    this.authService.signIn()
  }
  logout() {
    console.log('logout');
    this.authService.signOut()
  }
}
