import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiosComponent } from './radios.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { RadioTwentyModule } from '@lbk/shared/components/radios';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    RadiosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: RadiosComponent
    }]),
    MatGridListModule,
    RadioTwentyModule,
    MatTooltipModule
  ]
})
export class RadiosModule {
}
