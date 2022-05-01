import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitchModule, InputModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { SubHeaderModule } from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { SettingsPageComponent } from './containers';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    // Shared Components From Libs
    SwitchModule,
    InputModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From FrontendMentor
    SubHeaderModule,
  ],
  declarations: [COMPONENTS, SettingsPageComponent],
})
export class SettingsModule {}
