import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feedback } from '@lbk/models';
import { FeedbacksFacade } from '@lbk/state/feedbacks';

@Component({
  selector: 'lbk-feedback-roadmap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-roadmap.component.html',
  styleUrls: ['./feedback-roadmap.component.scss'],
})
export class FeedbackRoadmapComponent {
  @Input()
  feedback!: Feedback;

  constructor(private readonly _feedbacksFacade: FeedbacksFacade) {}

  upvoteButtonClick() {
    // Downvote
    if (this.feedback.upvoted) {
      this._feedbacksFacade.downvote(this.feedback.feedback_id);
      return;
    }

    // Upvote
    this._feedbacksFacade.upvote(this.feedback.feedback_id);
  }
}
