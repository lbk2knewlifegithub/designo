import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  /**
   * - Home Route
   */
  {
    path: '',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
    data: { animation: 'feedbacks' },
    canActivate: [AuthGuard],
  },
  /**
   * - Feedback Detail Route
   */
  {
    path: 'feedback',
    loadChildren: () =>
      import('./pages/view-feedback').then((m) => m.ViewFeedbackModule),
    data: { animation: 'feedback' },
    canActivate: [AuthGuard],
  },
  /**
   * - Create Feedback Route
   */
  {
    path: 'create-feedback',
    loadChildren: () =>
      import('./pages/create-feedback').then((m) => m.CreateFeedbackModule),
    data: { animation: 'create-feedback' },
    canActivate: [AuthGuard],
  },

  /**
   * - Edit Feedback Route
   */
  {
    path: 'edit-feedback',
    loadChildren: () =>
      import('./pages/edit-feedback').then((m) => m.EditFeedbackModule),
    data: { animation: 'edit-feedback', mustLoggedIn: true },
    canActivate: [AuthGuard],
  },
  /**
   * - Roadmap Route
   */
  {
    path: 'roadmap',
    loadChildren: () => import('./pages/roadmap').then((m) => m.RoadmapModule),
    data: { animation: 'roadmap' },
    canActivate: [AuthGuard],
  },

  /**
   * - Profile Route
   */
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile').then((m) => m.ProfileModule),
    data: { animation: 'profile', mustLoggedIn: true },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/feedbacks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
