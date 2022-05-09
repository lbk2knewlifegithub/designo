import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'lbk-add-comment-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="bg-white p-6 rounded-xl md:p-8"
    >
      <!--      Title-->
      <h3>Add Comment</h3>
      <!--      end Title-->

      <textarea
        #textarea
        formControlName="content"
        placeholder="Type your comment here"
        rows="3"
        class="w-full p-4 mt-6 bg-secondary rounded-lg"
      ></textarea>

      <!-- Errors -->
      <span *ngIf="required" class="error">Can't be empty.</span>
      <span *ngIf="maxLength" class="error">Maximum 250 characters</span>
      <!-- end Errors -->

      <div class="flex items-center justify-between mt-4">
        <!--        Characters Left-->
        <span class="text-neutral text-xs md:text-base"
          >{{ charactersLeft$ | async }} Characters left</span
        >
        <!--        end Characters Left-->

        <!--        Submit Button-->
        <button class="btn btn-accent">Post Comment</button>
        <!--        end Submit Button-->
      </div>
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
export class AddCommentFormComponent implements OnInit {
  form!: FormGroup;
  charactersLeft$!: Observable<number>;

  @Output() addComment = new EventEmitter<string>();

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit() {
    // Init Form
    this.form = this._fb.group({
      content: ['', [Validators.required, Validators.maxLength(250)]],
    });

    // Characters left
    this.charactersLeft$ = this.content.valueChanges.pipe(
      startWith(''),
      map((content) => 250 - content.length)
    );
  }

  get content(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get required(): boolean {
    return this.content.touched && this.content.hasError('required');
  }

  get maxLength(): boolean {
    return this.content.touched && this.content.hasError('maxlength');
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.addComment.emit(this.content.value);
    this.form.reset({
      content: '',
    });
  }
}
