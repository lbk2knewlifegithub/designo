import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchesComponent } from './switches.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SwitchTwentyModule } from '@lbk/shared/components/switches';


@NgModule({
  declarations: [SwitchesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SwitchesComponent
    }]),
    MatGridListModule,
    MatTooltipModule,
    SwitchTwentyModule
  ]
})
export class SwitchesModule {
}
