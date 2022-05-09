import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginOauthPageComponent } from './containers/login-oauth-page.component';
import { LoginOauthGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: LoginOauthPageComponent,
    canActivate: [LoginOauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOauthRoutingModule {}
