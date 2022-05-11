import { SpinnerModule } from '@lbk/comps';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { EmailSettingsPageComponent } from './containers';
import { NotificationRoutingModule } from './email-settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,

    // Shared Components From Libs
    SpinnerModule,

    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, EmailSettingsPageComponent],
})
export class EmailSettingsModule {}
