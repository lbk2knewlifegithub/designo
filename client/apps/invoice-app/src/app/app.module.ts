import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@lbk/auth';
import { JwtInterceptor } from '@lbk/interceptors';
import { API_URL } from '@lbk/tokens';
import { DialogModule } from '@ngneat/dialog';
import { NxModule } from '@nrwl/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';
import { StateModule } from './state';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NxModule.forRoot(),
    StateModule.forRoot(),
    HttpClientModule,
    // Thirds Libs
    DialogModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
