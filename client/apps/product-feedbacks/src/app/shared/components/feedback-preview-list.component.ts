import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Feedback, identifyFeedback } from '@lbk/models';
import { FeedbackPreviewModule } from './feedback-preview/feedback-preview.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lbk-feedback-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-4 xl:gap-5">
      <li *ngFor="let feedback of feedbacks; trackBy: identifyFeedback">
        <lbk-feedback-preview [feedback]="feedback"></lbk-feedback-preview>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host-context(.planned, .in-progress, .live) {
        @apply gap-6;
      }
    `,
  ],
})
export class FeedbackPreviewListComponent {
  @Input()
  feedbacks!: Feedback[];

  identifyFeedback = identifyFeedback;
}

@NgModule({
  imports: [CommonModule, RouterModule, FeedbackPreviewModule],
  exports: [FeedbackPreviewListComponent],
  declarations: [FeedbackPreviewListComponent],
})
export class FeedbackPreviewListModule {}
