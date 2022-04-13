import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feedback } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { take } from 'rxjs';
import { CoreFacade } from '../../../../core/state/core.facade';

@Component({
  selector: 'lbk-feedback-roadmap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-roadmap.component.html',
  styleUrls: ['./feedback-roadmap.component.scss'],
})
export class FeedbackRoadmapComponent {
  @Input()
  feedback!: Feedback;

  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}

  upvoteButtonClick() {
    this._authFacade.loggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      if (!loggedIn) return this._coreFacade.showRequiredLogin();

      // Downvote
      if (this.feedback.upvoted) {
        this._feedbacksFacade.downvote(this.feedback.feedback_id);
        return;
      }

      // Upvote
      this._feedbacksFacade.upvote(this.feedback.feedback_id);
    });
  }
}
