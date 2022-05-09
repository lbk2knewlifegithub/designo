import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-payments',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <ul
        class="flex gap-2 bg-secondary-50 px-4 py-2 rounded-lg mx-auto max-w-[368px] lg:px-6 lg:py-3"
      >
        <!-- Visa -->
        <li>
          <img src="assets/images/unlock-pro/visa.png" alt="Visa" />
        </li>
        <!-- end Visa -->

        <!-- Paypal -->
        <li>
          <img src="assets/images/unlock-pro/paypal.png" alt="Paypal" />
        </li>
        <!-- end Paypal -->

        <!-- Mastercard -->
        <li>
          <img src="assets/images/unlock-pro/mastercard.png" alt="Mastercard" />
        </li>
        <!-- end Mastercard -->

        <!-- Maestro -->
        <li>
          <img src="assets/images/unlock-pro/maestro.png" alt="Maestro" />
        </li>
        <!-- end Maestro -->
      </ul>
    </section>
  `,
})
export class PaymentsComponent {}
