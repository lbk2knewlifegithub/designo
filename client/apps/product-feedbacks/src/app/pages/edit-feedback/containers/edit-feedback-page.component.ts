import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UpdateFeedbackDTO } from '@lbk/dto';
import { Feedback } from '@lbk/models';
import { FeedbacksFacade } from '../../../state';
import { Observable } from 'rxjs';
import { EditFeedbackPageFacade } from '../state';

@Component({
  selector: 'lbk-edit-feedback-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="cotnainer flex flex-col items-center">
      <header class="mt-6 md:w-[540px] md:mt-14">
        <lbk-go-back></lbk-go-back>
      </header>

      <lbk-feedback-form
        class="pb-20 mt-10 md:mt-16"
        [feedback]="(feedback$ | async)!"
        [pending]="(pending$ | async)!"
        (updateFeedback)="updateFeedback($event)"
        (deleteFeedback)="deleteFeedback($event)"
      ></lbk-feedback-form>
    </main>
  `,
})
export class EditFeedbackPageComponent implements OnInit {
  feedback$!: Observable<Feedback>;
  pending$!: Observable<boolean>;

  constructor(
    private readonly _feedbackFacade: FeedbacksFacade,
    private readonly _editPageFacade: EditFeedbackPageFacade
  ) {}

  ngOnInit() {
    this.feedback$ = this._feedbackFacade
      .selectedFeedback$ as Observable<Feedback>;

    this.pending$ = this._editPageFacade.pending$;
  }

  updateFeedback(updateFeedbackDTO: UpdateFeedbackDTO) {
    this._feedbackFacade.updateFeedback(updateFeedbackDTO);
  }

  deleteFeedback(feedback_id: number) {
    this._feedbackFacade.deleteFeedback(feedback_id);
  }
}
