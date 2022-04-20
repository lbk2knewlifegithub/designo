import { createAction, props } from '@ngrx/store';
import { InvoiceStatus } from '../../../../shared';

/**
 * - Enter Home Page
 */
export const enter = createAction('[Home] Enter');

/**
 * - Filter By Status
 */
export const filterByStatus = createAction(
  '[Home] Filter By Status',
  props<{ status: InvoiceStatus | null }>()
);

/**
 * - Show Create Invoice Overlay
 */
export const showCreateInvoiceOverlay = createAction(
  '[Home] Show Create Invoice Overlay'
);

/**
 * - Close Create Invoice Overlay
 */
export const closeCreateInvoiceOverlay = createAction(
  '[Home] Close Create Invoice Overlay'
);
