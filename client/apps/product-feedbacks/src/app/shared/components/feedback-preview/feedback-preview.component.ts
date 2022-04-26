import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '@lbk/models';
import { HomeFacade } from '../../../pages/home/state';
import { FeedbacksFacade } from '../../../state';

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
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _homeFacade: HomeFacade,
    private readonly _router: Router
  ) {}

  get commentsAmount() {
    return this.feedback.comments ? this.feedback.comments.length : 0;
  }

  /**
   * - Upvote button Click
   */
  upvoteButtonClick() {
    // Downvote
    if (this.feedback.upvoted) {
      this._feedbacksFacade.downvote(this.feedback.feedback_id);
      return;
    }

    // Upvote
    this._feedbacksFacade.upvote(this.feedback.feedback_id);
  }

  /**
   *  - Category Click
   * @param category
   */
  categoryClick() {
    this._homeFacade.setCategory(this.feedback.category);
    this._router.navigateByUrl('/');
  }
}
