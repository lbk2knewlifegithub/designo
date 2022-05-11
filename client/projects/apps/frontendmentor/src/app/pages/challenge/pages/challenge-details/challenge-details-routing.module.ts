import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDetailsPageComponent } from './containers';
import { ChallengeExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':id',
    component: ChallengeDetailsPageComponent,
    canActivate: [ChallengeExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeDetailsRoutingModule {}
