import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnlockProPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: UnlockProPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnlockProRoutingModule {}
