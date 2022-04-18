import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundsComponent } from './page-not-founds.component';
import { SiblingTabModule } from '@lbk/shared/components/tabs';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PageNotFoundsComponent],
  imports: [
    CommonModule,
    SiblingTabModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageNotFoundsComponent
      },
    ])
  ]
})
export class PageNotFoundsModule {
}
