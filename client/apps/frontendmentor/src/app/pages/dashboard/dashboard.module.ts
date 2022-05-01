import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  ChallengePreviewListModule,
  SolutionPreviewModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import { LengthPipeModule } from '@lbk/pipes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment as env } from '../../../environments/environment';
import { COMPONENTS } from './components';
import {
  DashboardPageComponent,
  MyBookmarksPageComponent,
  MyChallengesPageComponent,
  MyNetworkPageComponent,
  ShellDashboardPageComponent,
} from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardEffects } from './effects';
import * as fromDashboard from './reducers';
import { DashboardFakeService, DashboardImplService } from './services';
import { DASHBOARD_SERVICE } from './tokens';

export const CONTAINERS = [
  DashboardPageComponent,
  MyBookmarksPageComponent,
  MyChallengesPageComponent,
  MyNetworkPageComponent,
  ShellDashboardPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Stores
    StoreModule.forFeature(fromDashboard.dashboardFeature),
    EffectsModule.forFeature([DashboardEffects]),

    // Shared Pipes From Libs
    LengthPipeModule,

    // Shared Directives From Libs
    ScrollToModule,
    SpinnerModule,

    // Shared Components From Frontendmentor
    SubHeaderModule,
    ChallengePreviewListModule,
    SolutionPreviewModule,
  ],
  providers: [
    {
      provide: DASHBOARD_SERVICE,
      useClass: env.production ? DashboardImplService : DashboardFakeService,
    },
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class DashboardModule {}
