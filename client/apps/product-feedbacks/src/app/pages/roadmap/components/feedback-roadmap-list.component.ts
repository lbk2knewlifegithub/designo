import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FeedbackSummary, identifyFeedback } from '@lbk/models';

@Component({
  selector: 'lbk-feedback-roadmap-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3 class="text-neutral-300 text-base">
      {{ summary.status | titlecase }} ({{ summary.feedbacks.length }})
    </h3>
    <span class="text-neutral text-sm-h">{{ summary.description }}</span>

    <!--      Feedback Preview List-->
    <ul
      *ngIf="summary.feedbacks.length > 0; else empty"
      class="grid gap-4 mt-6 xl:gap-5"
    >
      <li *ngFor="let feedback of summary.feedbacks; trackBy: identifyFeedback">
        <lbk-feedback-roadmap
          [class]="summary.status"
          [feedback]="feedback"
        ></lbk-feedback-roadmap>
      </li>
    </ul>
    <!--      end Feedback Preview List-->

    <!-- Empty -->
    <ng-template #empty>
      <lbk-empty-feedbacks-roadmap></lbk-empty-feedbacks-roadmap>
    </ng-template>
    <!-- end Empty -->
  `,
})
export class FeedbackRoadmapListComponent {
  @Input() summary!: FeedbackSummary;

  identifyFeedback = identifyFeedback;
}
