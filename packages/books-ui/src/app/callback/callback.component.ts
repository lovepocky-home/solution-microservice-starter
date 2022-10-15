import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.less']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.callback()
  }

  async callback() {
    try {
      await this.authService.logtoClient.handleSignInCallback(window.location.href);
      console.log(await this.authService.logtoClient.isAuthenticated()); // true

      // jump
      await this.authService.updateUserInfo()
      await this.router.navigateByUrl('/')
    } catch {
      // 处理错误
    }
  }

}
