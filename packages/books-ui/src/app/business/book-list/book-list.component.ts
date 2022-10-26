import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book, BookService } from '../../generated/rest';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {

  books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([])

  constructor(private bookSvc: BookService, public auth: AuthService) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    this.bookSvc.booksControllerGetList().subscribe({
      next: val => {
        console.log('books data', val);
        this.books.next(val.data)
      }
    })
  }

}
