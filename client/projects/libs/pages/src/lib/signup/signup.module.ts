import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarInputModule,
  ConfirmPasswordInputModule,
  InputModule,
  OpenTheDoorLoadingModule,
  PasswordInputModule,
} from '@lbk/comps';
import { SignupFormComponent } from './components';
import { SignupPageComponent } from './containers';
import { SignupRoutingModule } from './signup-routing.module';

const CONTAINERS = [SignupPageComponent];
const COMPONENTS = [SignupFormComponent];

@NgModule({
  imports: [
    // Built in Modules
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    // Shared Components From Auth
    OpenTheDoorLoadingModule,
    // Shared Components From Lib
    AvatarInputModule,
    ConfirmPasswordInputModule,
    PasswordInputModule,
    InputModule,
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class SignupModule {}
