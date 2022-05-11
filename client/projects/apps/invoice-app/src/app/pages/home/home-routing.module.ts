import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TryLoginGuard } from '@lbk/user';
import { HomePageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [TryLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
