import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesResolver } from './challenges.resolver';
import { ChallengesPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ChallengesPageComponent,
    resolve: {
      challenges: ChallengesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengesRoutingModule {}
