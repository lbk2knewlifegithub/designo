import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterWaveButtonComponent } from './water-wave-button.component';



@NgModule({
  declarations: [
    WaterWaveButtonComponent
  ],
  exports: [
    WaterWaveButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WaterWaveButtonModule { }
