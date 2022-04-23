import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fadeOutLeft, listInLeft } from '@lbk/anims';
import { Invoice } from '../../../../shared';

@Component({
  selector: 'lbk-invoice-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul @listInLeft class="grid gap-4">
      <ng-container *ngFor="let invoice of invoices; trackBy: identifyInvoice">
        <li @fadeOutLeft>
          <lbk-invoice-preview [invoice]="invoice"></lbk-invoice-preview>
        </li>
      </ng-container>
    </ul>
  `,
  animations: [
    listInLeft({
      item: 'lbk-invoice-preview',
    }),
    // slideInLeftOnEnterAnimation({ delay: 300 }),
    fadeOutLeft({ delay: 200 }),
  ],
})
export class InvoicePreviewListComponent {
  @Input() invoices!: Invoice[];

  identifyInvoice(index: number, invoice: Invoice) {
    return invoice.invoice_id;
  }
}
