import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Feedback } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ViewFeedbacksFacade } from '../state';
import { CoreFacade } from './../../../core/state/core.facade';

@Component({
  selector: 'lbk-view-feedback-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-feedback-page.component.html',
})
export class ViewFeedbackPageComponent implements OnInit {
  feedback$!: Observable<Feedback>;
  isOwnedByUser$!: Observable<boolean>;
  loadingComments$!: Observable<boolean>;
  hasComments$!: Observable<boolean>;

  constructor(
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _facade: ViewFeedbacksFacade,
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade
  ) {}

  ngOnInit(): void {
    this.feedback$ = this._feedbacksFacade
      .selectedFeedback$ as Observable<Feedback>;

    this.loadingComments$ = this._facade.loadingComments$;

    this.isOwnedByUser$ = combineLatest([
      this._feedbacksFacade.selectedFeedback$,
      this._authFacade.user$,
    ]).pipe(
      map(([feedback, user]) => {
        if (!feedback || !user) return false;
        return feedback.user_id === user.user_id;
      })
    );

    this.hasComments$ = this.feedback$.pipe(
      map((feedback) => {
        if (!feedback || !feedback.comments) return false;
        return feedback.comments.length > 0;
      })
    );
  }

  addComment(content: string) {
    this._authFacade.loggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      if (!loggedIn) return this._coreFacade.showRequiredLogin();

      this.feedback$.pipe(take(1)).subscribe(({ feedback_id }) => {
        this._feedbacksFacade.addComment(feedback_id, {
          content,
          parent_id: null,
          replying_to: null,
        });
      });
    });
  }
}