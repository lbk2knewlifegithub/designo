import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../../form-group.component';

@Component({
  selector: 'lbk-e-money-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent" class="grid gap-6 md:grid-cols-2">
      <!-- account number -->
      <lbk-account-number-input
        [parent]="parent"
        [groupName]="groupName"
      ></lbk-account-number-input>
      <!-- end account number -->

      <!-- pin -->
      <lbk-pin-input [groupName]="groupName" [parent]="parent"></lbk-pin-input>
      <!-- end pin -->
    </div>
  `,
})
export class EMoneyPaymentMethodComponent extends FormGroupComponent {
  override groupName = 'eMoney';
}
