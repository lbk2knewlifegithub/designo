import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'lbk-name-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="name"
      placeHolder="Alexel Ward"
    ></lbk-input>
  `,
})
export class NameInputComponent extends InputComponent {}
