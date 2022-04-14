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
import { StoreModule } from '@ngrx/store';
import { ChangePasswordDialogComponent, UserFormComponent } from './components';
import { ProfilePageComponent } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';
import { profileFeature } from './state/profile.reducer';

const COMPONENTS = [ChangePasswordDialogComponent, UserFormComponent];
const CONTAINERS = [ProfilePageComponent];

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    // Stores
    StoreModule.forFeature(profileFeature),
    // Shared Components From Library
    AvatarInputModule,
    PasswordInputModule,
    ConfirmPasswordInputModule,
    InputModule,
    SpinnerModule,
    AvatarPipeModule,
    AlertModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ProfileModule {}
