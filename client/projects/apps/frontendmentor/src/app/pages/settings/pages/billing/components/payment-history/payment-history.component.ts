import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-payment-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <h2 class="font-bold text-lg tracking-widest">PAYMENT HISTORY</h2>

      <div class="mt-6">
        <lbk-payment-history-list class="md:hidden"></lbk-payment-history-list>

        <lbk-payment-history-table
          class="hidden md:block"
        ></lbk-payment-history-table>
      </div>
    </section>
  `,
})
export class PaymentHistoryComponent {}
