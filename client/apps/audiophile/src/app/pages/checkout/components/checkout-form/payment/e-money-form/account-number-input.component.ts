import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../../form-group.component';

@Component({
  selector: 'lbk-account-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName">
        <label for="e-money-number" class="text-xs font-bold"
          >e-Money Number</label
        >
        <input
          credit-card
          formControlName="accountNumber"
          id="e-money-number"
          class="mt-2"
          type="text"
          placeholder="238521993"
        />
      </div>
    </div>
  `,
})
export class AccountNumberInputComponent extends FormGroupComponent {}
