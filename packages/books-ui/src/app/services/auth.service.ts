import { Injectable } from '@angular/core';
import LogtoClient, { UserInfoResponse } from '@logto/browser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logtoClient: LogtoClient

  userInfo?: UserInfoResponse

  constructor() {
    // @ts-ignore
    window.authService = this
    this.logtoClient = new LogtoClient({
      endpoint: 'https://logto.pocki.cc',
      appId: 'AIONBgkMNra8acZnzpDEp',
    });
    this.updateUserInfo()
  }

  async updateUserInfo() {
    if (!this.userInfo) {
      if (!await this.logtoClient.isAuthenticated()) return

      this.userInfo = await this.logtoClient.fetchUserInfo()
      console.log(this.userInfo);
    }
  }

}
