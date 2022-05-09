import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Home Page
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
    data: {
      title: 'Audiophile | Home',
      animation: 'home',
    },
  },

  // Category Page
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category').then((m) => m.CategoryModule),
    data: {
      title: 'Audiophile | Category',
      animation: 'category',
    },
  },
  // Checkout Page
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout').then((m) => m.CheckoutModule),
    data: {
      title: 'Audiophile | Checkout',
      animation: 'checkout',
    },
  },

  // Product Details Page
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product-detail').then((m) => m.ProductDetailsModule),
    data: {
      title: 'Audiophile | Product Details',
      animation: 'product-details',
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
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
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
