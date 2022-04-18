import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmashToSubmitComponent } from './smash-to-submit.component';



@NgModule({
  declarations: [
    SmashToSubmitComponent
  ],
  exports: [
    SmashToSubmitComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SmashToSubmitModule { }
