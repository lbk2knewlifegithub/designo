import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashButtonComponent } from './trash-button.component';



@NgModule({
  declarations: [
    TrashButtonComponent
  ],
  exports: [
    TrashButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TrashButtonModule { }
