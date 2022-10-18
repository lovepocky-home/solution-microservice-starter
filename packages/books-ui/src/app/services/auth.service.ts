import { Injectable } from '@angular/core';
import LogtoClient, { UserInfoResponse } from '@logto/browser';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  logtoClient: LogtoClient

  logged?: boolean = false
  userInfo?: UserInfoResponse

  host: string

  constructor(c: ConfigService) {
    // @ts-ignore
    window.authService = this

    this.logtoClient = new LogtoClient(c.config.logto);
    this.updateUserInfo()

    this.host = c.config.host
    console.log(AuthService.name, this.host)
  }

  async updateUserInfo() {
    this.logged = await this.logtoClient.isAuthenticated()

    if (!this.userInfo) {
      if (!this.logged) return

      this.userInfo = await this.logtoClient.fetchUserInfo()
      console.log(this.userInfo);
    }
  }

  async signIn() {
    return this.logtoClient.signIn(`${this.host}/callback`)
  }

  async signOut() {
    return this.logtoClient.signOut(this.host)
  }

}
