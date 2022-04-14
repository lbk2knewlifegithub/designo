import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AlertModule,
  AttributionModule,
  InputModule,
  OpenTheDoorLoadingModule,
  PasswordInputModule,
} from '@lbk/comps';
import { LoginFormComponent } from './components/login-form.component';
import { LoginPageComponent } from './containers';
import { LoginRoutingModule } from './login-routing.module';

export const CONTAINERS = [LoginPageComponent];
export const COMPONENTS = [LoginFormComponent];

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    // Shared Components from Libs
    OpenTheDoorLoadingModule,
    PasswordInputModule,
    InputModule,
    AttributionModule,
    AlertModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class LoginModule {}
