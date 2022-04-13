import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-edit-feedback-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex flex-col gap-4 md:flex-row md:justify-between">
      <div class="md:flex md:gap-4 md:order-last">
        <!--        Save Changes Feedback Button-->
        <li>
          <button
            type="button"
            (click)="updateFeedback.emit()"
            class="btn btn-accent w-full md:w-auto md:px-6"
          >
            Save Changes
          </button>
        </li>
        <!--        end Save Changes Feedback Button-->

        <!--        Cancel Edit Feedback Button-->
        <li class="md:order-first">
          <button
            type="button"
            (click)="cancelUpdateFeedback.emit()"
            class="btn btn-neutral w-full md:w-auto md:px-6"
          >
            Cancel
          </button>
        </li>
        <!--        end Cancel Edit Feedback Button-->
      </div>

      <!--      Delete Feedback Button-->
      <li>
        <button
          (click)="deleteFeedback.emit()"
          type="button"
          class="btn btn-error w-full md:w-auto md:px-6"
        >
          Delete
        </button>
      </li>
      <!--      end Delete Feedback Button-->
    </ul>
  `,
})
export class EditFeedbackActionsComponent {
  @Output() deleteFeedback = new EventEmitter<void>();
  @Output() cancelUpdateFeedback = new EventEmitter<void>();
  @Output() updateFeedback = new EventEmitter<void>();
}
