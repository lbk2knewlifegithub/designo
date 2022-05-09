import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@lbk/comps';
import { UpperPipeModule } from '@lbk/pipes';
import { COMPONENTS } from './components';
import { FeedbackFormComponent } from './containers/feedback-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Shared
    UpperPipeModule,
    SpinnerModule,
  ],
  exports: [FeedbackFormComponent],
  declarations: [COMPONENTS, FeedbackFormComponent],
})
export class FeedbackFormModule {}
