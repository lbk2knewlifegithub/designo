import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-phone-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="phoneNumber"
      placeHolder="+1 202-555-0136"
    ></lbk-input>
  `,
})
export class PhoneInputComponent extends FormGroupComponent {}
