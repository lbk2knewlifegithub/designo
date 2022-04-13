import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from '@lbk/dto';
import { Feedback, FeedbackCategory } from '@lbk/models';
import { DialogService } from '@ngneat/dialog';
import { combineLatest, map, of } from 'rxjs';

@Component({
  selector: 'lbk-feedback-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-form.component.html',
})
export class FeedbackFormComponent implements OnInit {
  @Input() feedback?: Feedback;
  @Input() category?: FeedbackCategory;

  @Output() createFeedback = new EventEmitter<CreateFeedbackDTO>();
  @Output() updateFeedback = new EventEmitter<UpdateFeedbackDTO>();
  @Output() deleteFeedback = new EventEmitter<number>();

  form!: FormGroup;

  /**
   * - Pending
   */
  _pending = false;
  @Input()
  set pending(pending: boolean) {
    this._pending = pending;

    if (pending) {
      this.form?.disable();
    } else {
      this.form?.enable();
    }
  }
  get pending() {
    return this._pending;
  }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialogService: DialogService,
    private readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._initForm();
  }
  /**
   * - Init Form
   * @private
   */
  private _initForm() {
    const { title, category, status, description } = this.feedback || {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp: { [key: string]: any } = {};

    /**
     * - Title
     */
    tmp['title'] = [
      title ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ];

    /**
     * - Category
     */
    tmp['category'] = [
      this.category || category || 'ui',
      [Validators.required],
    ];

    /**
     * - Status
     */
    if (this.isEditMode) {
      tmp['status'] = [status ?? 'in-progress', [Validators.required]];
    }

    /**
     * - Description
     */
    (tmp['description'] = [
      description ?? '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(500)],
    ]),
      (this.form = this._fb.group(tmp));
  }

  /**
   * - Update Feedback Button Click
   */
  updateFeedbackButtonClick() {
    if (!this.form.dirty) {
      this._dialogService.error({ title: 'Error', body: 'Nothing to update' });
      return;
    }

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    // Previous feedback to current feedback is the same?
    if (this.feedback == this.form.value) return;

    if (this.feedback) {
      this.updateFeedback.emit(
        this.updateFeedbackDTO(this.feedback.feedback_id)
      );
    }
  }

  /**
   * - On Delete Feedback Button Click
   */
  deleteFeedbackButtonClick() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    combineLatest([
      of(this.feedback),
      this._dialogService.confirm<boolean>({
        title: 'Are you sure?',
        body: "You won't be able to revert this!",
      }).afterClosed$,
    ])
      .pipe(
        map(([feedback, confirmed]) => {
          if (!feedback || !confirmed) return { feedback_id: null };

          return { feedback_id: feedback.feedback_id };
        })
      )
      .subscribe(({ feedback_id }) => {
        if (!feedback_id) return;
        this.deleteFeedback.emit(feedback_id);
      });
  }

  /**
   * - Add Feedback Button Click
   */
  addFeedbackButtonClick() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    // Create New Feedback mode
    if (!this.isEditMode) {
      this.createFeedback.emit(this.createFeedbackDTO());
    }
  }

  /**
   *- Create Feedback DTO
   */
  createFeedbackDTO(): CreateFeedbackDTO {
    const { description, title, category } = this.form.value;
    return {
      description,
      title,
      category,
    };
  }

  /**
   * - Update Feedback DTO
   */
  updateFeedbackDTO(feedback_id: number): UpdateFeedbackDTO {
    const { description, title, category, status } = this.form.value;
    return {
      feedback_id,
      description,
      status,
      title,
      category,
    };
  }

  /**
   * - Reset Form
   */
  reset() {
    if (this.form.dirty) {
      this._dialogService
        .confirm({
          title: 'Are you sure?',
          body: 'You have unsaved changes. Are you sure you want to cancel?',
        })
        .afterClosed$.subscribe((confirmed) => {
          if (!confirmed) return;
          this._initForm();
          this._cd.detectChanges();
        });
      return;
    }

    this._dialogService.error({ title: 'Error', body: 'Nothing to cancel.' });
  }

  get isEditMode() {
    return !!this.feedback;
  }

  get srcIcon() {
    const iconName = this.isEditMode
      ? 'icon-edit-feedback'
      : 'icon-new-feedback';
    return `assets/shared/${iconName}.svg`;
  }

  get titleForm() {
    return this.isEditMode
      ? `Editing '${this.feedback?.title}'`
      : 'Create New Feedback';
  }
}
