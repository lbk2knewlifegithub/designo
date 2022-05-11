import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSettingsPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: EmailSettingsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
