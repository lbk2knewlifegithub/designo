import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './containers';
import { DeactiveUserFormGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canDeactivate: [DeactiveUserFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
