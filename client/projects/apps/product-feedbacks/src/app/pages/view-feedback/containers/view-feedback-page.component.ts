import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from '@lbk/user';
import { Feedback } from '../../../shared';
import { FeedbacksFacade } from '../../../state';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ViewFeedbacksFacade } from '../state';

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
    private readonly _userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.feedback$ = this._feedbacksFacade
      .selectedFeedback$ as Observable<Feedback>;

    this.loadingComments$ = this._facade.loadingComments$;

    this.isOwnedByUser$ = combineLatest([
      this._feedbacksFacade.selectedFeedback$,
      this._userFacade.user$,
    ]).pipe(
      map(([feedback, user]) => {
        if (!feedback || !user) return false;
        return feedback.user_id === user.id;
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
    this.feedback$.pipe(take(1)).subscribe(({ feedback_id }) => {
      this._feedbacksFacade.addComment(feedback_id, {
        content,
        parent_id: null,
        replying_to: null,
      });
    });
  }
}
