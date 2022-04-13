import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFeedbacks from './feedbacks.reducer';
import { FeedbackEffects } from './feedbacks.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromFeedbacks.feedbacksFeatureKey,
      fromFeedbacks.reducer
    ),
    EffectsModule.forFeature([FeedbackEffects]),
  ],
})
export class FeedbacksStateModule {}
