import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardPageComponent,
  MyBookmarksPageComponent,
  MyChallengesPageComponent,
  MyNetworkPageComponent,
} from './containers';
import { ShellDashboardPageComponent } from './containers/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellDashboardPageComponent,
    children: [
      {
        path: '',
        component: DashboardPageComponent,
        data: {
          title: 'DASHBOARD',
        },
      },
      {
        path: 'my-challenges',
        component: MyChallengesPageComponent,
        data: {
          title: 'MY CHALLENGES',
        },
      },
      {
        path: 'my-network',
        component: MyNetworkPageComponent,
        data: {
          title: 'MY NETWORK',
        },
      },
      {
        path: 'my-bookmarks',
        component: MyBookmarksPageComponent,
        data: {
          title: 'MY BOOKMARKS',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
