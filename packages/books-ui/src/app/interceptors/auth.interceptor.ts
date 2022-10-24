import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  apiServer: 'node' | 'py' | 'java' = 'node'

  constructor(private svc: AuthService) {
    // @ts-ignore
    window.authInterceptor = this
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next))
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.svc.use == 'logto') {
      let isResources = this.svc.resources.find(r => request.url.includes(r))
      if (!!isResources && await this.svc.logtoClient.isAuthenticated()) {
        console.log('url', request.url, isResources);
        const token = await this.svc.logtoClient.getAccessToken(isResources)
        return await lastValueFrom(next.handle(request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + token,
            'api-server': this.apiServer,
          }
        })))
      }
    } else if (this.svc.use == 'keycloak') {
      const k = this.svc.keycloak
      if (k.authenticated) {
        if (k.isTokenExpired()) { await k.updateToken(10) }
        const token = this.svc.keycloak.token
        return await lastValueFrom(next.handle(request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + token,
            'api-server': this.apiServer,
          }
        })))
      }
    }


    return await lastValueFrom(next.handle(request.clone({
      setHeaders: {
        'api-server': this.apiServer,
      }
    })))
  }
}
