import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/challenge-details').then((m) => m.ChallengeDetailsModule),
  },
  {
    path: 'hub',
    loadChildren: () => import('./pages/hub').then((m) => m.HubModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
