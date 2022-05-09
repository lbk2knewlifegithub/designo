import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeedbackFormModule, GobackModule } from '../../shared';
import { CreateFeedbackPageComponent } from './containers';
import { CreateFeedbackRoutingModule } from './create-feedback-routing.module';
import { CreateFeedbackEffects, createFeedbackFeature } from './state';

const CONTAINERS = [CreateFeedbackPageComponent];

@NgModule({
  imports: [
    CommonModule,
    FeedbackFormModule,
    // Store
    StoreModule.forFeature(createFeedbackFeature),
    EffectsModule.forFeature([CreateFeedbackEffects]),
    // Shared Module
    CreateFeedbackRoutingModule,
    GobackModule,
  ],
  declarations: [CONTAINERS],
})
export class CreateFeedbackModule {}
