import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core';

const routes: Routes = [
  // Home Page
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
  },

  {
    path: 'shell',
    component: ShellComponent,
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

  // Challenges
  {
    path: 'challenges',
    loadChildren: () =>
      import('./pages/challenges').then((m) => m.ChallengesModule),
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
