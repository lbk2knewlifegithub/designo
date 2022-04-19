import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  CLIENT_AUDIOPHILE_URL,
  CLIENT_DESIGNO_URL,
  CLIENT_PRODUCT_FEEDBACKS_URL,
} from '@lbk/tokens';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [
    {
      provide: CLIENT_PRODUCT_FEEDBACKS_URL,
      useValue: environment.clientProductFeedbacksUrl,
    },
    {
      provide: CLIENT_DESIGNO_URL,
      useValue: environment.clientDesignoUrl,
    },
    {
      provide: CLIENT_AUDIOPHILE_URL,
      useValue: environment.clientAudiophileUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
