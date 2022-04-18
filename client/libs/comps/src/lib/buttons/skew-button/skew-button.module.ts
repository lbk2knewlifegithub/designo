import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkewButtonComponent } from './skew-button.component';



@NgModule({
  declarations: [
    SkewButtonComponent
  ],
  exports: [
    SkewButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SkewButtonModule { }
