import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthFacade } from '@lbk/auth';
import { Unsubscriber } from '@lbk/comps';
import { Observable } from 'rxjs';
import { Invoice, InvoiceStatus } from '../../../shared';
import { NewInvoiceOverlayComponent } from '../components/new-invoice-overlay';
import { HomeFacade } from '../state';
import { InvoicesFacade } from './../../../state';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent extends Unsubscriber implements OnInit {
  invoices$!: Observable<Invoice[]>;
  totalInvoices$!: Observable<number>;
  filterByStatus$!: Observable<InvoiceStatus | null>;

  loading$!: Observable<boolean>;

  loggedIn$!: Observable<boolean>;

  @ViewChild(NewInvoiceOverlayComponent)
  newInvoiceOverlayComponent!: NewInvoiceOverlayComponent;

  constructor(
    private readonly _title: Title,
    private readonly _authFacade: AuthFacade,
    private readonly _homeFacade: HomeFacade,
    private readonly _invoicesFacade: InvoicesFacade
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.invoices$ = this._homeFacade.invoicesFiltered$;
    this.totalInvoices$ = this._homeFacade.totalInvoices$;
    this.loggedIn$ = this._authFacade.loggedIn$;

    this.filterByStatus$ = this._homeFacade.filterByStatus$;

    this.loading$ = this._homeFacade.loading$;

    this.appendSub = this.totalInvoices$.subscribe((total) => {
      if (total === 0) return this._title.setTitle('Invoices');
      this._title.setTitle(`Invoices - ${total} invoices`);
    });

    this._invoicesFacade.loadAllInvoices();
  }

  /**
   *  - Filter By Status
   * @param status
   */
  filterByStatus(status: InvoiceStatus | null): void {
    this._homeFacade.filterByStatus(status);
  }

  /**
   * - Show Create Invoice Overlay
   */
  showCreateInvoiceOverlay() {
    this._homeFacade.showCreateInvoiceOverlay();
  }
}
