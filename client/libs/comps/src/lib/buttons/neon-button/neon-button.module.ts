import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeonButtonComponent } from './neon-button.component';



@NgModule({
  declarations: [
    NeonButtonComponent
  ],
  exports: [
    NeonButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NeonButtonModule { }
