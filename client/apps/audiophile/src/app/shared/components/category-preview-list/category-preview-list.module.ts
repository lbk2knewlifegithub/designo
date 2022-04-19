import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { CategoryPreviewListComponent } from './category-preview-list.component';
import { CategoryPreviewComponent } from './category-preview.component';
import { ShopButtonComponent } from './shop-button.component';

const COMPONENTS = [
  CategoryPreviewListComponent,
  CategoryPreviewComponent,
  ShopButtonComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From Libs
    ImageModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class CategoryPreviewListModule {}
