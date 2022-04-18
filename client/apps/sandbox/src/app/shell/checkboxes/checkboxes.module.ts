import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesComponent } from './checkboxes.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckboxTwentyModule } from '@lbk/shared/components/checkboxs';


@NgModule({
  declarations: [CheckboxesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CheckboxesComponent
    }]),
    MatGridListModule,
    MatTooltipModule,
    CheckboxTwentyModule
  ]
})
export class CheckboxesModule {
}
