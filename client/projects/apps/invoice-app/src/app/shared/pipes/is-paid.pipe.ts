import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Invoice, InvoiceStatus } from '../models';

@Pipe({
  name: 'isPaid',
})
export class isPaidPipe implements PipeTransform {
  transform(invoice: Invoice | null | undefined): boolean {
    if (!invoice) return false;
    return invoice.status === InvoiceStatus.PAID;
  }
}

@NgModule({
  exports: [isPaidPipe],
  declarations: [isPaidPipe],
  providers: [isPaidPipe],
})
export class IsPaidPipeModule {}
