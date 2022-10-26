import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './business/book-list/book-list.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'book', loadChildren: () => import('./business/book/book.module').then(m => m.BookModule) },
  { path: '', component: BookListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
