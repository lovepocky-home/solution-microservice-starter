import { Injectable } from '@angular/core';
import LogtoClient, { UserInfoResponse } from '@logto/browser';
import Keycloak from 'keycloak-js';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  use: 'keycloak' | 'logto' = 'keycloak'

  logtoClient: LogtoClient

  keycloak

  logged?: boolean = false
  userInfo?: UserInfoResponse | any

  host: string

  resources = this.c.config.logto.resources

  constructor(private c: ConfigService) {
    // @ts-ignore
    window.authService = this

    this.host = c.config.host

    this.keycloak = new Keycloak(c.config.keycloak)

    this.keycloak.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: this.host + '/assets/keycloak-silence-check.html' })
      .then(authenticated => {
        this.logged = authenticated
        this.updateUserInfo()
      })

    this.logtoClient = new LogtoClient(c.config.logto);
    this.updateUserInfo()

    console.log('AuthService', this.host)
  }

  async updateUserInfo() {
    switch (this.use) {
      case 'keycloak':
        if (!this.userInfo) {
          if (!this.keycloak.authenticated) return

          this.userInfo = await this.keycloak.loadUserInfo()
          console.log(this.userInfo);
        }
        break
      case 'logto':
        this.logged = await this.logtoClient.isAuthenticated()

        if (!this.userInfo) {
          if (!this.logged) return

          this.userInfo = await this.logtoClient.fetchUserInfo()
          console.log(this.userInfo);
        }
        break
    }
  }

  async signIn() {
    switch (this.use) {
      case 'keycloak':
        return this.keycloak.login({ redirectUri: this.host })
      case 'logto':
        return this.logtoClient.signIn(`${this.host}/callback`)
    }
  }

  async signOut() {
    switch (this.use) {
      case 'keycloak':
        return this.keycloak.logout({ redirectUri: this.host })
      case 'logto':
        return this.logtoClient.signOut(this.host)
    }
  }

}
