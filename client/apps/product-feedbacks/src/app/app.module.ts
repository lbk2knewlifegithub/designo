import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from '@lbk/interceptors';
import { CoreHttpClientModule } from '@lbk/services';
import { AuthStateModule } from '@lbk/state/auth';
import { FeedbacksStateModule } from '@lbk/state/feedbacks';
import {
  API_AUTH_URL,
  API_IMAGES_URL,
  API_PRODUCT_FEEDBACKS_URL,
  CLIENT_AUTH_URL,
} from '@lbk/tokens';
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

    // Thirds Librairies
    DialogModule.forRoot(),
    // Shared Module
    FeedbacksStateModule,
    StateModule.forRoot(),
    AuthStateModule,
    CoreHttpClientModule,
  ],
  providers: [
    {
      provide: API_AUTH_URL,
      useValue: environment.apiAuthUrl,
    },
    {
      provide: API_IMAGES_URL,
      useValue: environment.apiImagesUrl,
    },
    {
      provide: API_PRODUCT_FEEDBACKS_URL,
      useValue: environment.apiProductFeedbacksUrl,
    },
    {
      provide: CLIENT_AUTH_URL,
      useValue: environment.clientAuthUrl,
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
