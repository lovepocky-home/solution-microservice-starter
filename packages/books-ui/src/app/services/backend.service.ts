import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiType: 'graphql' | 'rest' = 'rest'

  h = this.c.config.backendHost

  constructor(private c: ConfigService, private http: HttpClient, private auth: AuthService) {
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

  async comments(bookId: string) {
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.http.get(`${this.h}/api/v1/comment`, { params: { bookId } }).toPromise()
    }
  }

  async createComment(bookId: string, content: string) {
    const byUser = this.auth.userInfo?.sub
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.http.post(`${this.h}/api/v1/comment`, { bookId, content, byUser }).toPromise()
    }
  }

}
