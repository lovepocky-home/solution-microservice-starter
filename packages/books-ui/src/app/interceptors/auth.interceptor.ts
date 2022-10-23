import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private svc: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next))
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler) {
    let isResources = this.svc.resources.find(r => request.url.includes(r))

    if (!!isResources && await this.svc.logtoClient.isAuthenticated()) {
      console.log('url', request.url, isResources);
      const token = await this.svc.logtoClient.getAccessToken(isResources)
      return await lastValueFrom(next.handle(request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        }
      })))
    } else {
      return await lastValueFrom(next.handle(request))
    }
  }
}
