import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionPageComponent } from './containers';
import { SolutionExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':id',
    component: SolutionPageComponent,
    canActivate: [SolutionExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionRoutingModule {}
