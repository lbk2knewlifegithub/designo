import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Home Page
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
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
      useHash: true,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
