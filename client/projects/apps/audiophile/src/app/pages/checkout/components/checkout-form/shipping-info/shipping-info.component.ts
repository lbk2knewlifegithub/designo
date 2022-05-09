import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-shipping-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <h6 class="font-bold text-xs text-primary-900 uppercase">
        Shipping Info
      </h6>

      <div class="mt-4 grid gap-6 md:grid-cols-2 md:gap-y-6 md:gap-x-4">
        <lbk-address-input
          [groupName]="groupName"
          [parent]="parent"
          class="md:col-span-2"
        ></lbk-address-input>

        <lbk-zip-code-input
          [groupName]="groupName"
          [parent]="parent"
        ></lbk-zip-code-input>

        <lbk-country-input
          [groupName]="groupName"
          [parent]="parent"
        ></lbk-country-input>
      </div>
    </div>
  `,
})
export class ShippingInfoComponent extends FormGroupComponent {
  override groupName = 'shippingInfo';
}
