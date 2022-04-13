import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-title-input',
  template: `
    <div [formGroup]="parent">
      <h4>Feedback Title</h4>
      <span class="text-neutral text-xs"
        >Add a short, descriptive headline</span
      >
      <input formControlName="title" type="text" class="input mt-2" />

      <!-- Error -->
      <span *ngIf="required" class="error"> Can't be empty. </span>
      <span *ngIf="minLength" class="error"> Must least 3 characters. </span>
      <span *ngIf="maxLength" class="error"
        >Maximum length is 150 characters.</span
      >
      <!-- end Error -->
    </div>
  `,
})
export class TitleInputComponent {
  @Input() parent!: FormGroup;

  get title() {
    return this.parent.get('title');
  }

  get required() {
    return this.title?.touched && this.title?.hasError('required');
  }

  get minLength() {
    return this.title?.touched && this.title?.hasError('minlength');
  }

  get maxLength() {
    return this.title?.touched && this.title?.hasError('maxlength');
  }
}
