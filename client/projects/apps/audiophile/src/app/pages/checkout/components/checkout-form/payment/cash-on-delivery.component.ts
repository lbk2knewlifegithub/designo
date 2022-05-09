import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-cash-on-delivery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-8 items-start md:items-center">
      <img
        src="/assets/shared/desktop/cash-on-delivery.svg"
        alt="Cash on delivery"
      />

      <p class="text-gray-500 font-medium">
        The ‘Cash on Delivery’ option enables you to pay in cash when our
        delivery courier arrives at your residence. Just make sure your address
        is correct so that your order will not be cancelled.
      </p>
    </div>
  `,
})
export class CashOnDeliveryComponent {}
