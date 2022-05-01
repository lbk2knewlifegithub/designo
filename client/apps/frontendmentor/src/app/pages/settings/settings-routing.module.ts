import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      /**
       * - Profile Module
       */
      {
        path: '',
        loadChildren: () =>
          import('./pages/profile').then((m) => m.ProfileModule),
      },
      /**
       * - Account Module
       */
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account').then((m) => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
