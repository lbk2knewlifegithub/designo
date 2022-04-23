import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import {
  CreateInvoiceDTO,
  Invoice,
  RandomInvoice,
  UpdateInvoiceDTO,
} from '../../../shared';

export abstract class InvoicesService {
  constructor(protected readonly _http: HttpClient) {}
  /**
   * - Get Invoices
   */
  abstract getInvoices(): Observable<Invoice[]>;

  /**
   *  - Retrieve Invoice
   * @param invoice_id
   */
  abstract retrieveInvoice(invoice_id: number): Observable<Invoice>;

  /**
   * - Delete Invoice
   * @param invoice_id
   */
  abstract deleteInvoice(invoice_id: number): Observable<void>;

  /**
   * - Mask As Paid
   * @param invoice_id
   */
  abstract maskAsPaid(invoice_id: number): Observable<void>;

  /**
   * @param invoice_id
   * @param updateInvoiceDTO
   */
  abstract updateInvoice(
    updateInvoiceDTO: UpdateInvoiceDTO
  ): Observable<Invoice>;

  /**
   * @param invoice_id
   * @param createInvoice
   */
  abstract createInvoice(
    createInvoiceDto: CreateInvoiceDTO
  ): Observable<Invoice>;

  /**
   * - Random Invoice
   */
  randomInvoice(): Observable<RandomInvoice> {
    return this._http
      .get<RandomInvoice>('/api/invoices/random')
      .pipe(shareReplay(1));
  }
}
