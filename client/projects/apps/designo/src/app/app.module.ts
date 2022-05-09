import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';
import { DialogModule } from '@ngneat/dialog';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,

    // Thirds Library
    DialogModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
