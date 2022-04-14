import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarInputModule,
  ConfirmPasswordInputModule,
  InputModule,
  PasswordInputModule,
} from '@lbk/comps';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OpenTheDoorLoadingModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { SignupPageComponent } from './containers';
import { SignupRoutingModule } from './signup-routing.module';
import { SignUpEffects } from './state';
import * as fromSignUpPage from './state/signup.reducer';

const CONTAINERS = [SignupPageComponent];

@NgModule({
  imports: [
    // Built in Modules
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    // Stores
    StoreModule.forFeature(fromSignUpPage.signUpFeature),
    EffectsModule.forFeature([SignUpEffects]),
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
