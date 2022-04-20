import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers';
import { TryLoginGuard } from '@lbk/auth';
import { PendingGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canDeactivate: [PendingGuard],
    canActivate: [TryLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
