import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-description-input',
  template: `
    <div [formGroup]="parent">
      <h4>Feedback Detail</h4>
      <span class="text-neutral text-xs"
        >Include any specific comments on what should be improved, added,
        etc.</span
      >

      <textarea formControlName="description" rows="5" class="mt-2"></textarea>

      <!-- Error -->
      <span *ngIf="required" class="error"> Can't be empty. </span>
      <span *ngIf="minLength" class="error"> Must least 8 characters. </span>
      <span *ngIf="maxLength" class="error"
        >Maximum length is 500 characters.</span
      >
      <!-- end Error -->
    </div>
  `,
})
export class DescriptionInputComponent {
  @Input() parent!: FormGroup;

  get desciption() {
    return this.parent.get('description');
  }

  get required() {
    return this.desciption?.touched && this.desciption?.hasError('required');
  }

  get minLength() {
    return this.desciption?.touched && this.desciption?.hasError('minlength');
  }

  get maxLength() {
    return this.desciption?.touched && this.desciption?.hasError('maxlength');
  }
}
