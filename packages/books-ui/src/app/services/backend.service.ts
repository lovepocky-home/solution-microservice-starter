import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookService, CommentService } from '../generated/rest';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiType: 'graphql' | 'rest' = 'rest'

  h = this.c.config.backendHost

  constructor(private c: ConfigService, private http: HttpClient, private auth: AuthService,
    private bookSvc: BookService,
    private commentSvc: CommentService,
  ) {
    // @ts-ignore
    window.backend = this
    console.log('BackendService', this.apiType);
  }

  async books() {
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.bookSvc.booksControllerGetList().toPromise()
    }
  }

  async comments(bookId: string) {
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.commentSvc.commentControllerFindAll(bookId).toPromise()
    }
  }

  async createComment(bookId: string, content: string) {
    if (!this.auth.userInfo) return
    const byUserId = this.auth.userInfo.sub
    switch (this.apiType) {
      case 'graphql':
        return
      case 'rest':
        return this.commentSvc.commentControllerCreate({ bookId, content, byUserId }).toPromise()
    }
  }

}
