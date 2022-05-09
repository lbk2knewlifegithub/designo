import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDetailsPageComponent } from './containers';
import { ChallengeExistsGuard } from './guards';
import { ChallengeDetailsResolver } from './resolvers';

const routes: Routes = [
  {
    path: ':id',
    component: ChallengeDetailsPageComponent,
    canActivate: [ChallengeExistsGuard],
    resolve: {
      challenge: ChallengeDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeDetailsRoutingModule {}
