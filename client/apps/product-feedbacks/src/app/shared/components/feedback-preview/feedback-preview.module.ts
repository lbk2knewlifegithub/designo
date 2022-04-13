import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackPreviewComponent } from './feedback-preview.component';
import { CommonModule } from '@angular/common';
import { CommentsAmountComponent } from './comments-amount.component';
import { UpvoteModule } from '../upvote.component';
import { UpperPipeModule } from '@lbk/pipes';

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
