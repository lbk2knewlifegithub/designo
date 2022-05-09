import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { addDays } from '@lbk/utils';
import memo from 'memo-decorator';
import { Invoice } from '../models';

@Pipe({
  name: 'paymentDue',
})
export class PaymentDuePipe implements PipeTransform {
  @memo()
  transform({ createdAt, paymentTerms }: Invoice): string {
    return addDays(createdAt, paymentTerms);
  }
}

@NgModule({
  exports: [PaymentDuePipe],
  declarations: [PaymentDuePipe],
  providers: [PaymentDuePipe],
})
export class PaymentDuePipeModule {}
