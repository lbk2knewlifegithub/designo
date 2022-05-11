import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MustLoggedInGuard, TryLoginGuard } from '@lbk/user';
import { ShellComponent } from './core/containers';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [TryLoginGuard],
    children: [
      // Home Page
      {
        path: 'home',
        loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
      },

      // Feed Page
      {
        path: 'feed',
        loadChildren: () => import('./pages/feed').then((m) => m.FeedModule),
        canActivate: [MustLoggedInGuard],
      },

      // Dashboard Page
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard').then((m) => m.DashboardModule),
        canActivate: [MustLoggedInGuard],
      },

      // Profile
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile').then((m) => m.ProfileModule),
        canActivate: [MustLoggedInGuard],
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

      // Settings
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings').then((m) => m.SettingsModule),
        canActivate: [MustLoggedInGuard],
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
        canActivate: [MustLoggedInGuard],
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
        loadChildren: () =>
          import('./pages/contact').then((m) => m.ContactModule),
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
        loadChildren: () =>
          import('./pages/hiring').then((m) => m.HiringModule),
      },

      // Report Page
      {
        path: 'report',
        loadChildren: () =>
          import('./pages/report').then((m) => m.ReportModule),
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
    ],
  },
  // Login Page
  {
    path: 'login',
    loadChildren: () => import('@lbk/pages').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
