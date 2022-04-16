import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule, AppComponent } from './core';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
