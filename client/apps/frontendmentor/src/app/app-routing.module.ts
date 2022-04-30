import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Home Page
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
  },

  // Solution
  {
    path: 'solution',
    loadChildren: () =>
      import('./pages/solution').then((m) => m.SolutionModule),
  },

  // Shell
  {
    path: 'shell',
    loadChildren: () => import('./pages/shell').then((m) => m.ShellModule),
  },

  // Challenges
  {
    path: 'challenges',
    loadChildren: () =>
      import('./pages/challenges').then((m) => m.ChallengesModule),
  },

  // Challenge Details
  {
    path: 'challenge',
    loadChildren: () =>
      import('./pages/challenge').then((m) => m.ChallengeModule),
  },

  // Notifications
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications').then((m) => m.NotificationsModule),
  },

  // Unlock Pro
  {
    path: 'unlock-pro',
    loadChildren: () =>
      import('./pages/unlock-pro').then((m) => m.UnlockProModule),
  },

  // Contact Page
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact').then((m) => m.ContactModule),
  },
  // Resources
  {
    path: 'resources',
    loadChildren: () =>
      import('./pages/resources').then((m) => m.ResourcesModule),
  },

  // Hiring Page
  {
    path: 'hiring',
    loadChildren: () => import('./pages/hiring').then((m) => m.HiringModule),
  },

  // FAQ Page
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq').then((m) => m.FAQModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
