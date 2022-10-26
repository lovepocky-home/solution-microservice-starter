import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './business/book-list/book-list.component';
import { BookModule } from './business/book/book.module';
import { CallbackComponent } from './callback/callback.component';
import { ApiModule, BASE_PATH } from './generated/rest';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ConfigService } from './services/config.service';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    UserInfoComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    BookModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    /** inject for swagger client */
    { provide: BASE_PATH, useFactory: (config: ConfigService) => config.config.backendHost, deps: [ConfigService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
