import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallOfFamePageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: WallOfFamePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallOfFameRoutingModule {}
