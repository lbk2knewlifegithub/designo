import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule, DropDownModule, SpinnerModule } from '@lbk/comps';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FingerprintSpinnerModule } from 'angular-epic-spinners';
import {
  InvoiceFormModule,
  InvoiceStatusModule,
  OverlayModule,
  PriceModule,
  TotalPriceInvoicePipeModule,
  TotalPricePipeModule,
} from '../../shared';
import { COMPONENTS } from './components';
import { HomePageComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects, homeFeature } from './state';

const CONTAINERS = [HomePageComponent];

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Stores
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),

    // Shared Components From Libs
    CheckboxModule,
    DropDownModule,
    SpinnerModule,

    // Thirds Libs
    FingerprintSpinnerModule,

    // Shared Pipes From Invoices
    TotalPriceInvoicePipeModule,
    TotalPricePipeModule,

    // Shared Components From Invoices
    InvoiceFormModule,
    OverlayModule,
    CheckboxModule,
    PriceModule,
    InvoiceStatusModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class HomeModule {}
