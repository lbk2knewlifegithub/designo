import { ShellPageComponent } from './containers/shell-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ShellPageComponent,
    children: [
      // Solutions
      {
        path: 'solutions',
        loadChildren: () =>
          import('./pages/solutions').then((m) => m.SolutionsModule),
      },
      // Activities
      {
        path: 'activity',
        loadChildren: () =>
          import('./pages/activity').then((m) => m.ActivityModule),
      },
      // Wall of Fame
      {
        path: 'wall-of-fame',
        loadChildren: () =>
          import('./pages/wall-of-fame').then((m) => m.WallOfFameModule),
      },
      {
        path: '',
        redirectTo: '/shell/solutions',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
