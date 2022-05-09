import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarsComponent } from './search-bars.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchBarRoundModule } from '../../../../../../../libs/shared/components/search-bars/src/lib/search-bar-round/search-bar-round.module';


@NgModule({
  declarations: [
    SearchBarsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SearchBarsComponent
    }]),
    MatTooltipModule,
    SearchBarRoundModule
  ]
})
export class SearchBarsModule {
}
