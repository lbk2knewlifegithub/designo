import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
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
export class InputComponent {
  @Input() parent!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() inputType = 'text';

  get formControl(): FormControl {
    return this.parent.get(this.controlName) as FormControl;
  }

  hasError(error: string): boolean {
    return this.formControl?.touched && this.formControl?.hasError(error);
  }

  get required(): boolean {
    return this.hasError('required');
  }

  get maxlength(): LengthError | null {
    const errors = this.formControl.errors;
    return errors && errors['maxlength'];
  }

  get minlength(): LengthError | null {
    const errors = this.formControl.errors;
    return errors && errors['minlength'];
  }

  get email(): boolean {
    return this.hasError('email');
  }
  get emailExists(): boolean {
    return this.hasError('emailExists');
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent],
  declarations: [InputComponent],
})
export class InputModule {}
