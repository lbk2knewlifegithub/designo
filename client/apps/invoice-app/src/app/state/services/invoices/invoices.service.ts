import { Observable } from 'rxjs';
import { CreateInvoiceDTO, Invoice, UpdateInvoiceDTO } from '../../../shared';

export interface InvoicesService {
  /**
   * - Get Invoices
   */
  getInvoices(): Observable<Invoice[]>;

  /**
   *  - Retrieve Invoice
   * @param invoice_id
   */
  retrieveInvoice(invoice_id: number): Observable<Invoice>;

  /**
   * - Delete Invoice
   * @param invoice_id
   */
  deleteInvoice(invoice_id: number): Observable<void>;

  /**
   * - Mask As Paid
   * @param invoice_id
   */
  maskAsPaid(invoice_id: number): Observable<void>;

  /**
   * @param invoice_id
   * @param updateInvoiceDTO
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO): Observable<void>;

  /**
   * @param invoice_id
   * @param createInvoice
   */
  createInvoice(createInvoiceDto: CreateInvoiceDTO): Observable<Invoice>;
}
