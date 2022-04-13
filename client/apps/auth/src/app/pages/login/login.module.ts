import { InputModule } from './../../../../../../libs/comps/src/lib/inputs/input/input.component';
import { PasswordInputModule } from '@lbk/comps';
import { AuthLoadingModule } from './../../shared/loading.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginFormComponent } from './components/login-form.component';
import { LoginPageComponent } from './containers';
import { LoginRoutingModule } from './login-routing.module';
import { LoginEffects } from './state/login.effects';
import * as fromLoginPage from './state/login.reducer';

export const CONTAINERS = [LoginPageComponent];
export const COMPONENTS = [LoginFormComponent];

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    // Stores
    StoreModule.forFeature(fromLoginPage.loginFeature),
    EffectsModule.forFeature([LoginEffects]),
    // Shared Components
    AuthLoadingModule,
    PasswordInputModule,
    InputModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class LoginModule {}
