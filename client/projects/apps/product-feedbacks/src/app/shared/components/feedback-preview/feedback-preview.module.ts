import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpperPipeModule } from '@lbk/pipes';
import { UpvoteModule } from '../upvote.component';
import { CommentsAmountComponent } from './comments-amount.component';
import { FeedbackPreviewComponent } from './feedback-preview.component';

const COMPONENTS = [FeedbackPreviewComponent, CommentsAmountComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shred Module
    UpvoteModule,
    UpperPipeModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class FeedbackPreviewModule {}
