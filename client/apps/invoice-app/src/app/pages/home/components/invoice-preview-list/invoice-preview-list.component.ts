import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '../../../../shared';

@Component({
  selector: 'lbk-invoice-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- @listIn  -->
    <ul class="grid gap-4">
      <ng-container *ngFor="let invoice of invoices; trackBy: identifyInvoice">
        <li>
          <!-- @slideInLeftOnEnter
          @fadeOutRightOnLeave -->
          <lbk-invoice-preview [invoice]="invoice"></lbk-invoice-preview>
        </li>
      </ng-container>
    </ul>
  `,
  animations: [
    // listInLeft({ staggerDuration: 80, duration: 200 }),
    // slideInLeftOnEnterAnimation({ delay: 300 }),
    // fadeOutRightOnLeaveAnimation({ delay: 200 }),
  ],
})
export class InvoicePreviewListComponent {
  @Input() invoices!: Invoice[];

  identifyInvoice(index: number, invoice: Invoice) {
    return invoice.invoice_id;
  }
}
