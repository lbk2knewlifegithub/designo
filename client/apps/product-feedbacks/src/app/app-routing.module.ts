import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, TryLoginGuard } from '@lbk/auth';

const routes: Routes = [
  /**
   * - Home Route
   */
  {
    path: '',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
    data: { animation: 'feedbacks' },
    canActivate: [TryLoginGuard],
  },
  /**
   * - Feedback Detail Route
   */
  {
    path: 'feedback',
    loadChildren: () =>
      import('./pages/view-feedback').then((m) => m.ViewFeedbackModule),
    data: { animation: 'feedback' },
    canActivate: [TryLoginGuard],
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
    data: { animation: 'edit-feedback' },
    canActivate: [AuthGuard],
  },
  /**
   * - Roadmap Route
   */
  {
    path: 'roadmap',
    loadChildren: () => import('./pages/roadmap').then((m) => m.RoadmapModule),
    data: { animation: 'roadmap' },
    canActivate: [TryLoginGuard],
  },

  /**
   * - Login route
   */
  {
    path: 'login',
    loadChildren: () => import('@lbk/pages').then((m) => m.LoginModule),
    data: { animation: 'login' },
  },
  /**
   * - Sign Up route
   */
  {
    path: 'signup',
    loadChildren: () => import('@lbk/pages').then((m) => m.SignupModule),
    data: { animation: 'signup' },
  },
  /**
   * - Profile Route
   */
  {
    path: 'profile',
    loadChildren: () => import('@lbk/pages').then((m) => m.ProfileModule),
    data: { animation: 'profile' },
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
