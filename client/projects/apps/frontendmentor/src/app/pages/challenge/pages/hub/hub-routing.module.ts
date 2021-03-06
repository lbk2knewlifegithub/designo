import { HubGuard } from './guards';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubPageComponent } from './containers/hub-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: HubPageComponent,
    canActivate: [HubGuard],
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./pages/overview').then((m) => m.OverviewModule),
      },
      {
        path: 'solutions',
        loadChildren: () =>
          import('./pages/solutions').then((m) => m.SolutionsModule),
      },
      {
        path: 'submit-solution',
        loadChildren: () =>
          import('./pages/submit-solution').then((m) => m.SubmitSolutionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HubRoutingModule {}
