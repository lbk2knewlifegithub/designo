import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-payment-terms',
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName">
        <label for="paymentTerms" class="text-muted-600">Payment Terms</label>

        <select
          id="paymentTerms"
          class="mt-[10px]"
          formControlName="paymentTerms"
        >
          <option value="1">Net 1 Days</option>
          <option value="7">Net 7 Days</option>
          <option value="30">Net 30 Days</option>
        </select>
      </div>
    </div>
  `,
})
export class PaymentTermsComponent {
  @Input() parent!: FormGroup;
  @Input() controlName!: string;
  @Input() groupName!: string | number;
}
