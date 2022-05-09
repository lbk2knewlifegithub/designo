import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-form-group',
  template: ` `,
})
export class FormGroupComponent {
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
}
