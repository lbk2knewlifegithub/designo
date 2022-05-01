import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { BillingRoutingModule } from './billing-routing.module';
import { COMPONENTS } from './components';
import { BillingPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    BillingRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, BillingPageComponent],
})
export class BillingModule {}
