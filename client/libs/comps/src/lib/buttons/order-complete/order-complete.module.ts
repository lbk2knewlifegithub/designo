import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCompleteComponent } from './order-complete.component';


@NgModule({
  declarations: [
    OrderCompleteComponent
  ],
  exports: [
    OrderCompleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderCompleteModule {
}
