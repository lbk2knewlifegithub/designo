import { createAction } from '@ngrx/store';

/**
 * - Close Update Overlay
 */
export const closeUpdateOverlay = createAction(
  '[InvoiceDetailsPage] Close Update Overlay'
);

/**
 * - Show Update Overlay
 */
export const showUpdateOverlay = createAction(
  '[InvoiceDetailsPage] Show Update Overlay'
);
