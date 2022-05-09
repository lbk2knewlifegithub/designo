import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-form-control',
  template: ``,
})
export class FormControlComponent {
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
  @Input() controlName!: string;
}
