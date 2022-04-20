import { EditOverlayComponent } from './edit-invoice-overlay/edit-overlay.component';
export { EditOverlayComponent } from './edit-invoice-overlay/edit-overlay.component';
import * as fromInvoiceDetail from './invoice-details';
import { InvoiceDetailsActionsComponent } from './invoice-details-actions.component';

export const COMPONENTS = [
  fromInvoiceDetail.COMPONENTS,
  InvoiceDetailsActionsComponent,
  EditOverlayComponent,
];
