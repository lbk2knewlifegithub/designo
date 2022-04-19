import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import {
  CategoryPreviewListModule,
  FeaturesPipeModule,
  GoBackModule,
  PriceModule,
  ProductNamePipeModule,
  QuantityModule,
  TheBestModule,
} from '../../shared';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { ProductDetailRoutingModule } from './product-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    // Shared Pipes from Audiophile
    FeaturesPipeModule,
    ProductNamePipeModule,
    // Shared Components from Audiophile
    QuantityModule,
    GoBackModule,
    TheBestModule,
    CategoryPreviewListModule,
    PriceModule,
    // Shared Components from Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ProductDetailsModule {}
