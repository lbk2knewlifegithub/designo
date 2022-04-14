import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Feedback } from '@lbk/models';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { map, Observable } from 'rxjs';
import { HomeFacade } from '../state/home.facade';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  feedbacks$!: Observable<Feedback[]>;
  loading$!: Observable<boolean>;
  isEmptyFeedbacks$!: Observable<boolean>;

  constructor(
    private readonly _homeFacade: HomeFacade,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}

  ngOnInit(): void {
    this.loading$ = this._homeFacade.loading$;

    this.feedbacks$ = this._homeFacade.feedbackFiltered$;

    this.isEmptyFeedbacks$ = this.feedbacks$.pipe(
      map((feedbacks) => feedbacks.length === 0)
    );

    /**
     * - Trigger Load feedback when enter home page
     */
    this._feedbacksFacade.loadAllFeedbacks();
  }
}
