import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

import { EditFeedbackPageComponent } from './containers';
import { CommonModule } from '@angular/common';
import { EditFeedbackRoutingModule } from './edit-feedback-routing.module';
import { FeedbackFormModule, GobackModule } from '../../shared';
import { StoreModule } from '@ngrx/store';
import { editFeedbackFeature, EditFeedbackPageEffects } from './state';

const CONTAINERS = [EditFeedbackPageComponent];

@NgModule({
  imports: [
    CommonModule,
    FeedbackFormModule,
    EditFeedbackRoutingModule,
    // Store
    StoreModule.forFeature(editFeedbackFeature),
    EffectsModule.forFeature([EditFeedbackPageEffects]),
    // Shared Module
    GobackModule,
  ],
  declarations: [CONTAINERS],
})
export class EditFeedbackModule {}
