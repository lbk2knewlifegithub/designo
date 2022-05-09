import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-address-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="address"
      label="Your Address"
      placeHolder="1137 Williams Avenue"
    ></lbk-input>
  `,
})
export class AddressInputComponent extends FormGroupComponent {}
