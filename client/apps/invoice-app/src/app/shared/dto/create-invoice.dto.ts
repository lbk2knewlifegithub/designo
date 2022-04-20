import { Invoice } from '../models';

export type CreateInvoiceDTO = Omit<Invoice, 'invoice_id'>;
