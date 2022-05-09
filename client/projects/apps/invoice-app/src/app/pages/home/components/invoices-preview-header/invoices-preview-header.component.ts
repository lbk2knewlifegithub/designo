import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { InvoiceStatus } from '../../../../shared';

@Component({
  selector: 'lbk-invoices-preview-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center justify-between">
      <lbk-total-invoices
        [status]="status"
        [total]="total"
      ></lbk-total-invoices>

      <div class="flex items-center gap-[18px] md:gap-10">
        <lbk-filter
          [status]="status"
          (statusChange)="statusChange.emit($event)"
        ></lbk-filter>

        <!-- New Invoice Button -->
        <button
          (click)="createInvoice.emit()"
          aria-label="New Invoice"
          data-cy="new-invoice-button"
          class="bg-primary-900 rounded-full flex items-center gap-2 p-[6px]  md:gap-4 group"
        >
          <!-- Plus Icon -->
          <div
            class="w-8 h-8 bg-white rounded-full grid place-content-center group-hover:animate-spin"
          >
            <span class="fas fa-plus text-primary-900"></span>
          </div>
          <!-- end Plus Icon -->

          <h5 class="text-white mr-2 md:mr-4">
            New <span class="hidden md:inline">Invoice</span>
          </h5>
        </button>
        <!-- end New Invoice Button -->
      </div>
    </nav>
  `,
})
export class InvoicesPreviewHeaderComponent {
  @Input() total!: number;
  @Input() status!: InvoiceStatus | null;

  @Output() statusChange = new EventEmitter<InvoiceStatus | null>();
  @Output() createInvoice = new EventEmitter<void>();
}
