import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Login Route
  {
    path: 'login',
    loadChildren: () => import('./pages/login').then((m) => m.LoginModule),
  },
  // Signup Route
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup').then((m) => m.SignupModule),
  },

  // Verify Email Route
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/verify-email').then((m) => m.VerifyEmailModule),
  },
  // Auto redirect to login page
  {
    path: '',
    redirectTo: '/login',
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
