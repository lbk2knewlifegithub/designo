import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautPageNotFoundComponent } from './astronaut-page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AstronautPageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AstronautPageNotFoundComponent,
      },
    ]),
  ],
})
export class AstronautPageNotFoundModule {}
