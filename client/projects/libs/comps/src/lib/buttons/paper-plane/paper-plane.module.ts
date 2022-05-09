import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperPlaneComponent } from './paper-plane.component';



@NgModule({
  declarations: [
    PaperPlaneComponent
  ],
  exports: [
    PaperPlaneComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaperPlaneModule { }
