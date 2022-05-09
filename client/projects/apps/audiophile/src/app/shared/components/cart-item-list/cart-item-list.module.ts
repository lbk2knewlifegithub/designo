import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortNamePipeModule } from '../../pipes';
import { PriceModule } from '../price';
import { QuantityModule } from '../quantity';
import { AmountComponent } from './amount.component';
import { CartItemListComponent } from './cart-item-list.component';
import { CartItemComponent } from './cart-item.component';

const COMPONENTS = [CartItemListComponent, CartItemComponent, AmountComponent];

@NgModule({
  imports: [
    CommonModule,
    // Shared Pipes from Audiophile
    ShortNamePipeModule,

    // Shared Components from Audiophile
    PriceModule,

    // Shared Components from Libs
    QuantityModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class CartItemListModule {}
