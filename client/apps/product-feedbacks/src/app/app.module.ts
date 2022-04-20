import { API_URL } from '@lbk/tokens';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@lbk/auth';
import { JwtInterceptor } from '@lbk/interceptors';
import { CoreHttpClientModule } from '@lbk/services';
import { FeedbacksStateModule } from '@lbk/state/feedbacks';
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
    CoreModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    // Thirds Libs
    DialogModule.forRoot(),
    // Shared Module From Libs
    FeedbacksStateModule,
    StateModule.forRoot(),
    AuthModule.forRoot(),
    CoreHttpClientModule,
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
