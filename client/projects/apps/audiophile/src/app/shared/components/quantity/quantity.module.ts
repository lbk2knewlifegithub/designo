import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuantityComponent } from './quantity.component';

@NgModule({
  imports: [CommonModule],
  exports: [QuantityComponent],
  declarations: [QuantityComponent],
})
export class QuantityModule {}
