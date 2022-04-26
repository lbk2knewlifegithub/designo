import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackSummary } from '@lbk/models';
import { RoadmapFacade } from '../state';
import { FeedbacksFacade } from '../../../state';

@Component({
  selector: 'lbk-roadmap-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    Header-->
    <lbk-roadmap-header></lbk-roadmap-header>
    <!--    end Header-->

    <!--    Tabs-->
    <lbk-roadmap-tabs
      [class]="(summary$ | async)!.status"
      class="md:hidden"
    ></lbk-roadmap-tabs>
    <!--    end Tabs-->

    <main class="container mt-6 pb-20 md:mt-8">
      <!--      Summary Mobile-->
      <lbk-feedback-roadmap-list
        class="md:hidden"
        [class]="(summary$ | async)!.status"
        [summary]="(summary$ | async)!"
      ></lbk-feedback-roadmap-list>
      <!--      end Summary Mobile-->

      <!--      Summary List-->
      <ul class="hidden  gap-3 grid-cols-3 md:grid">
        <li
          *ngFor="let summary of summaries$ | async; trackBy: identifySummary"
        >
          <lbk-feedback-roadmap-list
            [class]="summary.status"
            [summary]="summary"
          ></lbk-feedback-roadmap-list>
        </li>
      </ul>
      <!--      end Summary List-->
    </main>
  `,
})
export class RoadmapPageComponent implements OnInit {
  summaries$!: Observable<FeedbackSummary[]>;
  summary$!: Observable<FeedbackSummary>;

  constructor(
    private readonly _facade: RoadmapFacade,
    private readonly _feedbacksFade: FeedbacksFacade
  ) {}

  ngOnInit() {
    this.summaries$ = this._feedbacksFade.summaries$;
    this.summary$ = this._facade.summary$;

    this._feedbacksFade.loadFeedbacks();
  }

  identifySummary(index: number, summary: FeedbackSummary) {
    return summary.status;
  }
}
