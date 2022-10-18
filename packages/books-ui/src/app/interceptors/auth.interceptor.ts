import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, from, lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private svc: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next))
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler) {
    if (request.url.includes('api') && await this.svc.logtoClient.isAuthenticated()) {
      console.log('url', request.url);
      const token = await this.svc.logtoClient.getAccessToken(request.url)
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
