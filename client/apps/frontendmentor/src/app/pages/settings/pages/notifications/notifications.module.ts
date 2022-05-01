import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { NotificationsPageComponent } from './containers';
import { NotificationRoutingModule } from './notifications-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, NotificationsPageComponent],
})
export class NotifcationsModule {}
