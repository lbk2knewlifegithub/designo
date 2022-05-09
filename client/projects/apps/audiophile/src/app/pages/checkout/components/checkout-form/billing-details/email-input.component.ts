import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-email-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="email"
      placeHolder="alexel@mail.com"
    ></lbk-input>
  `,
})
export class EmailInputComponent extends FormGroupComponent {}
