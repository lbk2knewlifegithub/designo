import { FormGroup } from '@angular/forms';

export interface Input {
  parent: FormGroup;
  controlName: string;
  label: string;
  groupName?: string;
  inputType?: string;
  placeholder?: string;
}
