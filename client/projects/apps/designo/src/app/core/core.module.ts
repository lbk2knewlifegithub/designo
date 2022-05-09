import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AttributionModule,
  MenuOneModule,
  ScrollToTopModule,
} from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollToTopModule,
    // Shared Components from Libs
    AttributionModule,
    ScrollToModule,
    MenuOneModule,
  ],
  declarations: [COMPONENTS, AppComponent],
})
export class CoreModule {}
