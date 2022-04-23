import * as fromInvoiceList from './invoice-preview-list';
import * as fromHeader from './invoices-preview-header';
import {
  NewInvoiceActionsComponent,
  NewInvoiceOverlayComponent,
} from './new-invoice-overlay';
import { NoInvoicesComponent } from './no-invoices.component';

export const COMPONENTS = [
  fromInvoiceList.COMPONENTS,
  fromHeader.COMPONENTS,
  NewInvoiceOverlayComponent,
  NewInvoiceActionsComponent,
  NoInvoicesComponent,
];
