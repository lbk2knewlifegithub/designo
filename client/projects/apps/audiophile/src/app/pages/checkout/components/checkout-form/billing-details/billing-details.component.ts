import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-billing-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName">
        <h6 class="font-bold text-xs text-primary-900 uppercase">
          Billing details
        </h6>

        <div class="mt-4 grid gap-6 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
          <lbk-name-input
            [groupName]="groupName"
            [parent]="parent"
          ></lbk-name-input>

          <lbk-email-input
            [groupName]="groupName"
            [parent]="parent"
          ></lbk-email-input>

          <lbk-phone-input
            [groupName]="groupName"
            [parent]="parent"
          ></lbk-phone-input>
        </div>
      </div>
    </div>
  `,
})
export class BillingDetailsComponent extends FormGroupComponent {
  override groupName = 'billingDetails';
}
