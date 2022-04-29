import { SpinnerModule } from './../../../../../../libs/comps/src/lib/loading/spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment as env } from '../../../environments/environment';
import { SubHeaderModule } from '../../shared';
import { TimeAgoModule } from './../../../../../../libs/pipes/src/lib/time-ago.pipe';
import { COMPONENTS } from './components';
import { NotificationsPageComponent } from './containers';
import { NotificationsEffects } from './effects';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { PIPES } from './pipes';
import * as fromNotifications from './reducers/notifications.reducer';
import { NotificationsFakeService, NotificationsImplService } from './services';
import { NOTIFICATIONS_SERVICE } from './tokens';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    // Stores
    StoreModule.forFeature(
      fromNotifications.notificationsFeatureKey,
      fromNotifications.reducer
    ),
    EffectsModule.forFeature([NotificationsEffects]),

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Pipes From Libs
    TimeAgoModule,
    SpinnerModule,

    // Shared Components From FrontendMentor
    SubHeaderModule,
  ],
  providers: [
    {
      provide: NOTIFICATIONS_SERVICE,
      useClass: env.production
        ? NotificationsImplService
        : NotificationsFakeService,
    },
    PIPES,
  ],
  declarations: [COMPONENTS, PIPES, NotificationsPageComponent],
})
export class NotificationsModule {}
