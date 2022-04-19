import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GrandTotalPipeModule } from '../../pipes';
import { CartItemListModule } from '../cart-item-list';
import { PriceModule } from '../price';
import { GrandTotalOrderSuccessComponent } from './grand-total.component';
import { OrderItemListComponent } from './order-item-list.component';
import { OrderSuccessComponent } from './order-success.component';

const COMPONENTS = [
  OrderSuccessComponent,
  GrandTotalOrderSuccessComponent,
  OrderItemListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Pipes From Audiophile
    GrandTotalPipeModule,
    CartItemListModule,
    PriceModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class OrderSuccessModule {}
