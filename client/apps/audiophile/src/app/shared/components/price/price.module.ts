import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DollarsComponent } from './dollars.component';
import { PriceComponent } from './price.component';

const COMPONENTS = [PriceComponent, DollarsComponent];

@NgModule({
  imports: [CommonModule],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class PriceModule {}
