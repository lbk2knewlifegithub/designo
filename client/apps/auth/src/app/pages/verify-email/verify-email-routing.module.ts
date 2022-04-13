import { TokenExistsGuard } from './token-exists.guard';
import { VerifyEmailPageComponent } from './containers/verify-email-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailPageComponent,
    canActivate: [TokenExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmailRoutingModule {}
