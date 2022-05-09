import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice, PriceOptions } from '../../../../../shared';

@Component({
  selector: 'lbk-invoice-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent {
  @Input() invoice!: Invoice;

  priceOptions: PriceOptions = { size: 'text-lg' };

  get invoice_id() {
    return this.invoice.invoice_id;
  }
}
