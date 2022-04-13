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
import { listInLeft, listOutLeft } from '@lbk/anims';

@Component({
  selector: 'lbk-feedback-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul @listInLeft @listOutLeft class="relative grid gap-4 xl:gap-5">
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
  animations: [
    listInLeft({ item: 'lbk-feedback-preview' }),
    listOutLeft({ item: 'lbk-feedback-preview' }),
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
