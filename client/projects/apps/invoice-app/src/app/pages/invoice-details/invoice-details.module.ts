import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@lbk/comps';
import { StoreModule } from '@ngrx/store';
import {
  GoBackModule,
  InvoiceFormModule,
  InvoiceIdModule,
  InvoiceStatusModule,
  IsPaidPipeModule,
  OverlayModule,
  PriceModule,
  TotalPriceInvoicePipeModule,
  TotalPricePipeModule,
} from '../../shared';
import { PaymentDuePipeModule } from './../../shared/pipes/payment-due.pipe';
import { COMPONENTS } from './components';
import { InvoiceDetailsPageComponent } from './containers';
import { ViewInvoiceRoutingModule } from './invoice-details-routing.module';
import { invoiceDetailsFeature } from './state';

const CONTAINERS = [InvoiceDetailsPageComponent];

@NgModule({
  imports: [
    CommonModule,
    ViewInvoiceRoutingModule,
    // Stores
    StoreModule.forFeature(invoiceDetailsFeature),
    // Shared Components From Invoices
    OverlayModule,
    SpinnerModule,
    InvoiceFormModule,
    InvoiceIdModule,
    InvoiceStatusModule,
    PriceModule,
    GoBackModule,

    // Shared Pipes From Invoices
    TotalPriceInvoicePipeModule,
    TotalPricePipeModule,
    IsPaidPipeModule,
    PaymentDuePipeModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class InvoiceDetailsModule {}
