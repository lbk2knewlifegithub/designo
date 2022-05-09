import { FormGroup } from '@angular/forms';

export interface Input {
  parent: FormGroup;
  formControlName: string;
  inputType: string;
  label?: string;
}
