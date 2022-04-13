import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CLIENT_PRODUCT_FEEDBACKS_URL } from '@lbk/tokens';
import { AppComponent, CoreModule } from './core';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [
    {
      provide: CLIENT_PRODUCT_FEEDBACKS_URL,
      useValue: environment.clientProductFeedbacksUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
