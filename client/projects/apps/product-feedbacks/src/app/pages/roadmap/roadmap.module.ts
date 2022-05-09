import { NgModule } from '@angular/core';

import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';
import { CommonModule } from '@angular/common';
import { RoadmapRoutingModule } from './roadmap-routing.module';
import {
  AddFeedbackButtonModule,
  FeedbackPreviewListModule,
  GobackModule,
  UpvoteModule,
} from '../../shared';
import { StoreModule } from '@ngrx/store';
import { roadmapFeature } from './state/roadmap.reducer';
import { UpperPipeModule } from '@lbk/pipes';

@NgModule({
  imports: [
    CommonModule,
    RoadmapRoutingModule,
    StoreModule.forFeature(roadmapFeature),
    // Shared Module from Feedbacks
    GobackModule,
    UpvoteModule,
    AddFeedbackButtonModule,
    FeedbackPreviewListModule,
    // Shared Module from Libs
    UpperPipeModule,
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class RoadmapModule {}
