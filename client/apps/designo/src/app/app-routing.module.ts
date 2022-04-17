import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /**
   * - Home Page
   */
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
  },

  /**
   * - About Page
   */
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then((m) => m.AboutModule),
  },

  /**
   * - Contact Page
   */
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact').then((m) => m.ContactModule),
  },
  /**
   * - Projects Gallery Page
   */
  {
    path: 'projects-gallery',
    loadChildren: () =>
      import('./pages/projects-gallery').then((m) => m.ProjectsGalleryModule),
  },
  /**
   * - Locations page
   */
  {
    path: 'locations',
    loadChildren: () =>
      import('./pages/locations').then((m) => m.LocationsModule),
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
