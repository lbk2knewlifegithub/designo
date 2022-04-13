import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lbk-content-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <textarea
          formControlName="content"
          placeholder="Type your reply here"
          rows="3"
          class="w-full p-4 mt-6 bg-secondary rounded-lg"
        ></textarea>

        <!-- Errors -->
        <span *ngIf="required" class="error">Can't be empty.</span>
        <span *ngIf="maxLength" class="error">Maximum 250 characters</span>
        <!-- end Errors -->
      </div>

      <!-- Submit Reply Button -->
      <div class="mt-4 flex justify-end">
        <ng-content></ng-content>
      </div>
      <!-- end Submit Reply Button -->
    </form>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class ContentFormComponent implements OnInit {
  form!: FormGroup;

  @Output() submitted = new EventEmitter<string>();
  @Input() content?: string;
  @Input() submitButton!: string;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit() {
    // Init Form
    this.form = this._fb.group({
      content: [
        this.content || '',
        [Validators.required, Validators.maxLength(250)],
      ],
    });
  }

  get contentFC(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get required(): boolean {
    return this.contentFC.touched && this.contentFC.hasError('required');
  }

  get maxLength(): boolean {
    return this.contentFC.touched && this.contentFC.hasError('maxlength');
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitted.emit(this.contentFC.value);
    this.form.reset({
      content: '',
    });
  }
}
