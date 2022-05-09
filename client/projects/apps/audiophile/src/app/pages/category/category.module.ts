import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import {
  CategoryPreviewListModule,
  ProductNamePipeModule,
  TheBestModule,
} from '../../shared';
import { CategoryRoutingModule } from './category-routing.module';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    // Shared Pipes From Audiophile
    ProductNamePipeModule,
    // Shared Components From Audiophile
    TheBestModule,
    CategoryPreviewListModule,

    // Shared Components From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CategoryModule {}
