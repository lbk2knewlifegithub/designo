import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@lbk/comps';
import { LoginPageComponent } from './containers';
import { LoginOauthRoutingModule } from './login-oauth-routing.module';

export const CONTAINERS = [LoginPageComponent];
export const COMPONENTS = [];

@NgModule({
  imports: [
    CommonModule,
    LoginOauthRoutingModule,
    // Shared Components from Libs
    SpinnerModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class LoginOAuthModule {}
