import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feedback } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { take } from 'rxjs';
import { CoreFacade } from './../../../core/state/core.facade';

@Component({
  selector: 'lbk-feedback-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-preview.component.html',
  styles: [
    `
      :host {
        @apply bg-white block rounded-xl p-6 md:flex md:gap-10;
      }
    `,
  ],
})
export class FeedbackPreviewComponent {
  @Input()
  feedback!: Feedback;

  @Input()
  isShownStatus = false;

  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}

  get commentsAmount() {
    return this.feedback.comments ? this.feedback.comments.length : 0;
  }

  /**
   * - Upvote button Click
   */
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