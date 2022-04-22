import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Unsubscriber } from '@lbk/comps';
import { Observable, take } from 'rxjs';
import { Invoice, InvoiceStatus, UpdateInvoiceDTO } from '../../../shared';
import { EditOverlayComponent } from '../components';
import { InvoiceDetailsFacade } from '../state';
import { InvoicesFacade } from './../../../state/facade/invoices.facade';

@Component({
  selector: 'lbk-invoice-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-details-page.component.html',
})
export class InvoiceDetailsPageComponent
  extends Unsubscriber
  implements OnInit
{
  shownUpdateOverlay$!: Observable<boolean>;
  pendingSaveAndChange$!: Observable<boolean>;
  pendingMaskAsPaid$!: Observable<boolean>;
  pendingDelete$!: Observable<boolean>;
  error$!: Observable<string | null>;
  invoice$!: Observable<Invoice>;

  @ViewChild(EditOverlayComponent)
  editOverLayComponent!: EditOverlayComponent;

  constructor(
    private readonly _title: Title,
    private readonly _invoicesFacade: InvoicesFacade,
    private readonly _invoiceDetailsFacade: InvoiceDetailsFacade
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.invoice$ = this._invoicesFacade
      .selectedInvoice$ as Observable<Invoice>;

    this.shownUpdateOverlay$ = this._invoiceDetailsFacade.shownUpdateOverlay$;

    this.pendingSaveAndChange$ =
      this._invoiceDetailsFacade.pendingSaveAndChange$;

    this.pendingMaskAsPaid$ = this._invoiceDetailsFacade.pendingMaskAsPaid$;

    this.pendingDelete$ = this._invoiceDetailsFacade.pendingDelete$;

    // Set title
    this.appendSub = this.invoice$.subscribe((invoice) =>
      this._title.setTitle(
        `Invoices - ${invoice ? (invoice as Invoice).invoice_id : 0}`
      )
    );
  }

  /**
   * - Cancel Update
   */
  cancelUpdate() {
    this._invoiceDetailsFacade.closeUpdateOverlay();
  }

  /**
   * - Show Update Overlay
   */
  showUpdateOverlay() {
    this._invoiceDetailsFacade.showUpdateOverlay();
  }

  /**
   *  - Update Invoice
   * @param Update Invoice
   * */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO) {
    this._invoicesFacade.updateInvoice(updateInvoiceDTO);
  }

  /**
   * - Delete Invoice
   * @param invoice_id
   */
  deleteInvoice() {
    this.invoice$.pipe(take(1)).subscribe(({ invoice_id }) => {
      this._invoicesFacade.deleteInvoice(invoice_id);
    });
  }

  /**
   * - is Paid
   * @param invoice
   * @returns
   */
  isPaid(invoice: Invoice) {
    return invoice.status === InvoiceStatus.PAID;
  }

  /**
   * - Mask As Paid
   * @param invoice_id
   */
  maskAsPaid() {
    this.invoice$.pipe(take(1)).subscribe(({ invoice_id }) => {
      this._invoicesFacade.maskAsPaid(invoice_id);
    });
  }
}
