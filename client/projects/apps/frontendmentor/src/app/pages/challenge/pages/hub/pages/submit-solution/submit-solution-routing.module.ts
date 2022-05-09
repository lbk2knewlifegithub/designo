import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitSolutionPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SubmitSolutionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitSolutionRoutingModule {}
