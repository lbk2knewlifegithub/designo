import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HiringPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiringRoutingModule {}
