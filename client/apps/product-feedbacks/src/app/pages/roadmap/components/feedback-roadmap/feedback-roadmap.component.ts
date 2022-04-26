import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '@lbk/models';
import { FeedbacksFacade } from '../../../../state';
import { HomeFacade } from '../../../home/state';

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
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _homeFacade: HomeFacade,
    private readonly _router: Router
  ) {}

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
