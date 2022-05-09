import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionsPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SolutionsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionsRoutingModule {}
