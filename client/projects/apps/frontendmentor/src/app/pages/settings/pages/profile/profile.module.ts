import { AvatarPipeModule } from '@lbk/pipes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SwitchModule,
  AvatarInputModule,
  InputModule,
  SpinnerModule,
} from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { SubHeaderModule } from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { ProfilePageComponent } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,

    // Shared Components From Libs
    SwitchModule,
    InputModule,
    AvatarInputModule,
    AvatarPipeModule,
    SpinnerModule,

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    SubHeaderModule,
  ],
  declarations: [COMPONENTS, ProfilePageComponent],
})
export class ProfileModule {}
