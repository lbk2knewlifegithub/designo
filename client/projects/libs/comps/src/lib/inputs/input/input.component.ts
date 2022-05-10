import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Input as InputModel } from '@lbk/models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface LengthError {
  actualLength: number;
  requiredLength: number;
}

@Component({
  selector: 'lbk-input',
  templateUrl: './input.component.html',
  styles: [
    `
      input.ng-invalid.ng-touched {
        @apply border-2 border-red-500;
      }

      .error {
        @apply text-red-500 font-bold italic text-xs;
      }
    `,
  ],
})
export class InputComponent implements OnInit {
  @Input() input!: InputModel;

  inputType!: string;
  placeholder!: string;
  controlName!: string;

  ngOnInit(): void {
    const { inputType, placeholder, controlName } = this.input;
    this.inputType = inputType || 'text';
    this.placeholder = placeholder || '';
    this.controlName = controlName;
  }

  get formControl(): FormControl {
    const { parent, groupName, controlName } = this.input;
    return groupName
      ? // If GroupName is not provided, use the controlName
        ((parent.get(groupName) as FormGroup).get(controlName) as FormControl)
      : (parent.get(controlName) as FormControl);
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get required(): boolean {
    return this.hasError('required');
  }

  get maxlength(): LengthError | null {
    const errors = this.formControl?.errors;
    return errors && errors['maxlength'];
  }

  get minlength(): LengthError | null {
    const errors = this.formControl?.errors;
    return errors && errors['minlength'];
  }

  get email(): boolean {
    return this.hasError('email');
  }

  get emailExists(): boolean {
    return this.hasError('emailExists');
  }

  get url(): boolean {
    return this.hasError('url');
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent],
  declarations: [InputComponent],
})
export class InputModule {}
