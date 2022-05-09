import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../../form-group.component';

@Component({
  selector: 'lbk-pin-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="pin"
      placeHolder="6891"
      label="e-Money PIN"
    ></lbk-input>
  `,
})
export class EMoneyPinInputComponent extends FormGroupComponent {}
