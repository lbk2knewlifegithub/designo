import { Component } from '@angular/core';
import { FormGroupComponent } from '../form-helper/form-group.component';

@Component({
  selector: 'lbk-invoice-date-input',
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName || null">
        <label class="text-muted-600">Invoice Date</label>
        <div class="relative min-h-[48px]">
          <input
            class="mt-[10px] block h-full"
            type="date"
            id="createdAt"
            formControlName="createdAt"
            placeholder="Date Time"
          />
        </div>
      </div>
    </div>
  `,
})
export class InvoiceDateComponent extends FormGroupComponent {}
