import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@lbk/comps';
import { LoginPageComponent } from './containers';
import { LoginRoutingModule } from './login-routing.module';

export const CONTAINERS = [LoginPageComponent];
export const COMPONENTS = [];

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    // Shared Components from Libs
    SpinnerModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class LoginModule {}
