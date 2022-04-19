import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttributionModule, MenuOneModule } from '@lbk/comps';
import { ClickOutsideModule } from '@lbk/directives';
import {
  CartItemListModule,
  CategoryPreviewListModule,
  TotalModule,
  TotalPipeModule
} from '../shared';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

const CONTAINERS = [AppComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components Pipes Audiophile,
    TotalPipeModule,

    // Shared Components From Audiophile,
    CartItemListModule,
    TotalModule,
    CategoryPreviewListModule,
    // Shared Directives From Libs
    ClickOutsideModule,

    // Shared Components From Libs
    MenuOneModule,
    AttributionModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
