import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /**
   * - Home Page
   */
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
    data: {
      animation: 'home',
      title: "Designo's Home Page",
    },
  },

  /**
   * - About Page
   */
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then((m) => m.AboutModule),
    data: {
      animation: 'about',
      title: "Designo's About Page",
    },
  },

  /**
   * - Contact Page
   */
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact').then((m) => m.ContactModule),
    data: {
      animation: 'contact',
      title: "Designo's Contact Page",
    },
  },
  /**
   * - Projects Gallery Page
   */
  {
    path: 'projects-gallery',
    loadChildren: () =>
      import('./pages/projects-gallery').then((m) => m.ProjectsGalleryModule),
    data: {
      animation: 'projects-gallery',
      title: "Designo's Projects Gallery",
    },
  },
  /**
   * - Locations page
   */
  {
    path: 'locations',
    loadChildren: () =>
      import('./pages/locations').then((m) => m.LocationsModule),
    data: {
      animation: 'locations',
      title: "Designo's Locations Gallery",
    },
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
      useHash: true,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
