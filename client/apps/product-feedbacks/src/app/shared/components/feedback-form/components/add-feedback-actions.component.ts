import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-add-feedback-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex flex-col gap-4  md:flex-row md:justify-end">
      <!--        Add Feedback Button-->
      <li>
        <button
          (click)="addFeedback.emit()"
          class="btn btn-accent w-full md:w-auto md:px-6"
        >
          Add Feedback
        </button>
      </li>
      <!--        end Add Feedback Button-->

      <!--        Cancel Add Feedback Button-->
      <li>
        <button
          (click)="cancelAddFeedback.emit()"
          type="button"
          class="btn btn-neutral w-full md:order-first md:w-auto md:px-6"
        >
          Cancel
        </button>
      </li>
      <!--        end Cancel Add Feedback Button-->
    </ul>
  `,
})
export class AddFeedbackActionsComponent {
  @Input() disabled!: boolean;

  @Output() cancelAddFeedback = new EventEmitter<void>();
  @Output() addFeedback = new EventEmitter<void>();
}
