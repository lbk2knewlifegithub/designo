import { createAction, props } from '@ngrx/store';
import { CreateInvoiceDTO, Invoice, UpdateInvoiceDTO } from '../../shared';

/**
 * - Select Invoice
 */
export const selectInvoice = createAction(
  '[Invoices] Select Invoice',
  props<{ invoice_id: number | null }>()
);

/**
 * - Load Invoices
 */
export const loadInvoices = createAction('[Invoices] Load Invoices');

/**
 * - Load Invoice
 */
export const loadInvoice = createAction(
  '[Invoices] Load Invoice',
  props<{ invoice: Invoice }>()
);

/**
 * - Create Invoice
 */
export const createInvoice = createAction(
  '[Invoices] Create Invoice',
  props<{ createInvoiceDTO: CreateInvoiceDTO }>()
);

/**
 * - Delete Invoice
 */
export const deleteInvoice = createAction(
  '[Invoices] Delete Invoice',
  props<{ invoice_id: number }>()
);

/**
 * - Mask As Paid
 */
export const maskAsPaid = createAction(
  '[Invoices] Mask As Paid',
  props<{ invoice_id: number }>()
);

/**
 *  - Update Invoice
 */
export const updateInvoice = createAction(
  '[Invoices] Update Invoice',
  props<{ updateInvoiceDTO: UpdateInvoiceDTO }>()
);
