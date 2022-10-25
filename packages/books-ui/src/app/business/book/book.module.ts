import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book.component';



@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BookComponent
      }
    ]),
    CommonModule
  ]
})
export class BookModule { }
