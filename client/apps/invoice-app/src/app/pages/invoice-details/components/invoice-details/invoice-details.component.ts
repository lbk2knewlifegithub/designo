import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Invoice, InvoiceStatus } from '../../../../shared';

@Component({
  selector: 'lbk-invoice-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-details.component.html',
})
export class InvoiceDetailsComponent {
  @Input() invoice!: Invoice;
  @Input() error!: string;

  @Input() pendingMaskAsPaid!: boolean;
  @Input() pendingDelete!: boolean;

  @Output() updateInvoice = new EventEmitter<void>();
  @Output() deleteInvoice = new EventEmitter<number>();
  @Output() maskAsPaid = new EventEmitter<number>();

  onMaskAsPaid() {
    if (this.invoice.status === 'paid') return;
    this.maskAsPaid.emit();
  }

  get isPaid() {
    return this.invoice.status == InvoiceStatus.PAID;
  }
}
