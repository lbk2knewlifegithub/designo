import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-zip-code-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="zipCode"
      label="ZIP code"
      placeHolder="100001"
    ></lbk-input>
  `,
})
export class ZipCodeInputComponent extends FormGroupComponent {}
