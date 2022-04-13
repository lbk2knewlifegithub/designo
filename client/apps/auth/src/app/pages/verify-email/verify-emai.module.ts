import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SpinnerModule } from '@lbk/comps';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailPageComponent } from './containers';
import { COMPONENTS } from './components';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { verifyEmailFeature, VerifyEmailEffects } from './state';

export const CONTAINERS = [VerifyEmailPageComponent];

@NgModule({
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    ReactiveFormsModule,
    // Stores
    StoreModule.forFeature(verifyEmailFeature),
    EffectsModule.forFeature([VerifyEmailEffects]),

    // Shared components from Lib
    SpinnerModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class VerifyEmailModule {}
