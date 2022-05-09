import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselsComponent } from './carousels.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CarouselsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarouselsComponent
      }
    ]),
    MatTooltipModule
  ]
})
export class CarouselsModule {
}
