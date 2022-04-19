import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-country-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="country"
      placeHolder="United States"
    ></lbk-input>
  `,
})
export class CountryInputComponent extends FormGroupComponent {}
