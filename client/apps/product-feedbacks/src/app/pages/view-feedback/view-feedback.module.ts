import { AvatarPipeModule } from '@lbk/pipes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@lbk/comps';
import { FullnamePipeModule } from '@lbk/pipes';
import { StoreModule } from '@ngrx/store';
import { FeedbackPreviewModule, GobackModule } from '../../shared';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { viewFeedbackFeature } from './state';
import { ViewFeedbackRoutingModule } from './view-feedback-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViewFeedbackRoutingModule,
    ReactiveFormsModule,

    // Stores
    StoreModule.forFeature(viewFeedbackFeature),

    // Shared Components from Libs
    SpinnerModule,
    FeedbackPreviewModule,
    GobackModule,
    FullnamePipeModule,
    SpinnerModule,
    AvatarPipeModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ViewFeedbackModule {}
