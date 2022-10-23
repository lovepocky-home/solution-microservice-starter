import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiType: 'graphql' | 'rest' = 'rest'

  h = this.c.config.backendHost

  constructor(private c: ConfigService, private http: HttpClient) {
    // @ts-ignore
    window.backend = this
    console.log('BackendService', this.apiType);
  }

  async books() {
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.http.get(`${this.h}/api/v1/books`).toPromise()
    }
  }

}
