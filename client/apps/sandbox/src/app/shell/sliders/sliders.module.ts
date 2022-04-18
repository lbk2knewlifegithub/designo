import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidersComponent } from './sliders.component';
import { RouterModule } from '@angular/router';
import { SearchBarsComponent } from '../search-bars/search-bars.component';
import { MultiPartSlideModule } from '@lbk/shared/components/sliders';


@NgModule({
  declarations: [SlidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SlidersComponent
    }]),
    MultiPartSlideModule
  ]
})
export class SlidersModule {
}
