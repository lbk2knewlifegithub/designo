import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreHttpClientModule } from '@lbk/services';
import { API_AUTH_URL, API_IMAGES_URL } from '@lbk/tokens';
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
    CoreHttpClientModule,
    NxModule.forRoot(),
    // States
    StateModule.forRoot(),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
