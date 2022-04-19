import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@ngneat/dialog';
import { NxModule } from '@nrwl/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';
import { StateModule } from './state';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,

    NxModule.forRoot(),
    // Stores
    StateModule.forRoot(),

    // Thirds Librarys
    DialogModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
