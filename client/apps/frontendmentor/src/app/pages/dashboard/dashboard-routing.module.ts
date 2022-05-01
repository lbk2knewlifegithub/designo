import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardPageComponent,
  MyBookmarksPageComponent,
  MyChallengesPageComponent,
  MyNetworkPageComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'my-challenges',
    component: MyChallengesPageComponent,
  },
  {
    path: 'my-network',
    component: MyNetworkPageComponent,
  },
  {
    path: 'my-bookmarks',
    component: MyBookmarksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
