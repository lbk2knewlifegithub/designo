import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionPageComponent } from './containers';

const routes: Routes = [
  {
    path: ':solution_id',
    component: SolutionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionRoutingModule {}
