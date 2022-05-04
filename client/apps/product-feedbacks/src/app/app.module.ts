import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@lbk/auth';
import { JwtInterceptor } from '@lbk/interceptors';
import { CoreHttpClientModule } from '@lbk/services';
import { API_URL } from '@lbk/tokens';
import { DialogModule } from '@ngneat/dialog';
import { NxModule } from '@nrwl/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';
import { StateModule } from './state';
import { FeedbacksImplService } from './state/services';
import { FEEDBACKS_SERVICE } from './state/tokens/feedbacks.token';

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
      provide: FEEDBACKS_SERVICE,
      useValue: FeedbacksImplService,
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
