import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-checkout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" class="bg-white p-6 rounded-lg 2xl:p-11 2xl:pt-14">
      <h2 class="uppercase font-bold text-2xl md:text-3xl">Checkout</h2>

      <div class="mt-8 grid gap-8 md:mt-10 md:gap-14">
        <lbk-billing-details [parent]="form"></lbk-billing-details>
        <lbk-shipping-info [parent]="form"></lbk-shipping-info>
        <lbk-payment formControlName="payment"></lbk-payment>
      </div>
    </form>
  `,
})
export class CheckoutFormComponent {
  @Input() form!: FormGroup;
}
