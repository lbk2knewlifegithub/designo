import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceStatus } from './../../../../shared';

@Component({
  selector: 'lbk-total-invoices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1 class="text-2xl md:text-3xl">Invoices</h1>

      <div class="text-muted-700 dark:text-muted-800">
        <p [hidden]="!noInvoices">No invoices {{ status }}</p>
        <p [hidden]="noInvoices">
          <span class="hidden md:inline">There are </span>{{ total }} invoices
          {{ status }}
        </p>
      </div>
    </div>
  `,
})
export class TotalInvoicesComponent {
  @Input() total!: number;
  @Input() status!: InvoiceStatus | null;

  get noInvoices() {
    return this.total === 0;
  }
}
