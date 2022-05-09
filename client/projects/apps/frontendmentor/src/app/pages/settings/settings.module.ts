import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubHeaderModule } from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { SettingsPageComponent } from './containers';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    // Shared Components
    SubHeaderModule,
  ],
  declarations: [COMPONENTS, SettingsPageComponent],
})
export class SettingsModule {}
