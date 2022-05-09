import { createAction, props } from '@ngrx/store';
import { Invoice, UpdateInvoiceDTO } from '../../shared';

/**
 * - Load Invoices Success
 */
export const loadInvoicesSuccess = createAction(
  '[Invoices/API] Load Invoices Success',
  props<{ invoices: Invoice[]; override: boolean }>()
);

/**
 * - Load Invoices Failure
 */
export const loadInvoicesFailure = createAction(
  '[Invoices/API] Load Invoices Failure',
  props<{ error: string }>()
);

/**
 * - Delete Invoice Success
 */
export const deleteInvoiceSuccess = createAction(
  '[Invoices/API] Delete Invoice Success',
  props<{ invoice_id: number }>()
);

/**
 * - Delete Invoices Failure
 */
export const deleteInvoiceFailure = createAction(
  '[Invoices/API] Delete Invoice Failure',
  props<{ error: string }>()
);

/**
 * - Mask Invoice as Paid Success
 */
export const maskAsPaidSuccess = createAction(
  '[Invoices/API] Mask As Paid Success',
  props<{ invoice_id: number }>()
);

/**
 * - Mask Invoice as Paid Success
 */
export const maskAsPaidFailure = createAction(
  '[Invoices/API] Mask As Paid Failure',
  props<{ error: string }>()
);

/**
 * - Update Invoice Success
 */
export const updateInvoiceSuccess = createAction(
  '[Invoices/API] Update Invoice Success',
  props<{ invoice: Invoice }>()
);

/**
 * - Update Invoice Failure
 */
export const updateInvoiceFailure = createAction(
  '[Invoices/API] Edit Invoice Failure',
  props<{ error: string }>()
);

/**
 * - Search Invoice Success
 */
export const searchInvoiceSuccess = createAction(
  '[Invoices/API] Search Invoice Success',
  props<{ invoices: Invoice[] }>()
);

/**
 * - Search Invoice Failure
 */
export const searchInvoiceFailure = createAction(
  '[Invoices/API] Search Invoice Failure',
  props<{ error: string }>()
);

/**
 * - Create Invoice Success
 */
export const createInvoiceSuccess = createAction(
  '[Invoices/API] Create Invoice Success',
  props<{ invoice: Invoice }>()
);

/**
 * - Create Invoice Failure
 */
export const createInvoiceFailure = createAction(
  '[Invoices/API] Create Invoice Failure',
  props<{ error: string }>()
);
