import { Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-payment-method-input',
  template: `
    <div
      [ngClass]="ngClass"
      class="flex gap-4 items-center py-[17px] pl-4 border duration-500 rounded-lg cursor-pointer"
    >
      <!-- checkbox -->
      <lbk-checkbox [checked]="checked"></lbk-checkbox>
      <!-- end checkbox -->

      <p class="font-bold text-[14px]">{{ name }}</p>
    </div>
  `,
})
export class PaymentMethodInputComponent {
  @Input() name!: string;
  @Input() checked!: boolean;

  get ngClass() {
    return {
      '!border-primary-900': this.checked,
    };
  }
}
