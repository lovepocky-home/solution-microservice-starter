import { Injectable } from '@angular/core';
import LogtoClient, { UserInfoResponse } from '@logto/browser';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logtoClient: LogtoClient

  userInfo?: UserInfoResponse

  host: string

  constructor() {
    // @ts-ignore
    window.authService = this

    // TODO env specific params: return from backend

    this.logtoClient = new LogtoClient({
      endpoint: 'https://logto.pocki.cc',
      appId: 'AIONBgkMNra8acZnzpDEp',
      resources: [
        'http://localhost:14201/api/graphql'
      ]
    });
    this.updateUserInfo()

    this.host = 'https://books.pocki.cc'
    if (!environment.production) {
      this.host = 'http://localhost:14200'
    }

    console.log(AuthService.name, this.host)
  }

  async updateUserInfo() {
    if (!this.userInfo) {
      if (!await this.logtoClient.isAuthenticated()) return

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
