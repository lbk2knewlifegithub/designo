import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './containers';
import { CheckoutGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPageComponent,
    canActivate: [CheckoutGuard],
    canDeactivate: [CheckoutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
