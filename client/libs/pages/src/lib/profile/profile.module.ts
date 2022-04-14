import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AlertModule,
  AvatarInputModule,
  ConfirmPasswordInputModule,
  InputModule,
  PasswordInputModule,
  SpinnerModule,
} from '@lbk/comps';
import { AvatarPipeModule } from '@lbk/pipes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COMPONENTS } from './components';
import { ProfilePageComponent } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEffects } from './state/profile.effects';
import { profileFeature } from './state/profile.reducer';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    // Stores
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects]),
    // Shared Components From Feedbacks
    // Shared Components From Library
    AvatarInputModule,
    PasswordInputModule,
    ConfirmPasswordInputModule,
    InputModule,
    SpinnerModule,
    AvatarPipeModule,
    AlertModule,
  ],
  declarations: [COMPONENTS, ProfilePageComponent],
})
export class ProfileModule {}
