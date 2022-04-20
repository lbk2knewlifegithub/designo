import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Unsubscriber } from '@lbk/comps';

@Component({
  selector: 'lbk-form',
  template: ``,
})
export class FormGroupComponent extends Unsubscriber {
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
  @Input() arrayName!: string;
}
