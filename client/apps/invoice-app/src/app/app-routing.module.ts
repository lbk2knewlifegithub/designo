import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TryLoginGuard } from '@lbk/auth';
import { ShellComponent } from './core/containers';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home').then((m) => m.HomeModule),
        canActivate: [TryLoginGuard],
        data: { animation: 'Home' },
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./pages/invoice-details').then((m) => m.InvoiceDetailsModule),
        canActivate: [TryLoginGuard],
        data: { animation: 'Invoice' },
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
  // Signup Page
  {
    path: 'signup',
    loadChildren: () => import('@lbk/pages').then((m) => m.SignupModule),
  },
  // Profile Page
  {
    path: 'profile',
    loadChildren: () => import('@lbk/pages').then((m) => m.ProfileModule),
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
