import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakConfig } from 'keycloak-js';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  http: HttpClient

  config: {
    configName: string
    host: string
    backendHost: string
    logto: {
      endpoint: string,
      appId: string,
      resources: string[]
    }
    keycloak: KeycloakConfig
  } = {} as any

  constructor(handler: HttpBackend) {
    // https://github.com/angular/angular/issues/26845
    this.http = new HttpClient(handler)
  }

  public load() {
    console.log('init config');
    return from(new Promise((resolve, rej) => {
      this.http.get('assets/config/config.js', { responseType: "text" }).subscribe({
        next: file => {
          // load config from file
          let config: any
          eval(file)
          this.config = config
          console.log(config);
          resolve(true)
        },
        error: e => {
          // TODO error page
          console.error(e);
          resolve(true)
        }
      })

    }))
  }
}
