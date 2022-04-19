import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CartItemListModule,
  GoBackModule,
  GrandTotalPipeModule,
  PriceModule,
  ShippingPipeModule,
  TotalModule,
  TotalPipeModule,
  VATPipeModule,
} from '../../shared';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,

    // Shared Pipes From Audiophile
    ShippingPipeModule,
    TotalPipeModule,
    VATPipeModule,
    GrandTotalPipeModule,

    // Shared Components From Audiophile
    GoBackModule,
    CartItemListModule,
    TotalModule,
    PriceModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CheckoutModule {}
