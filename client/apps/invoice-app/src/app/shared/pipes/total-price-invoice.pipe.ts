import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../models';
import memo from 'memo-decorator';
import { TotalPriceItemPipe } from './total-price-item.pipe';

@Pipe({
  name: 'totalPriceInvoice',
})
export class TotalPriceInvoicePipe implements PipeTransform {
  constructor(private readonly _totalPriceItemPipe: TotalPriceItemPipe) {}

  @memo()
  transform({ items }: Invoice): number {
    return items.reduce(
      (sum, i) => sum + this._totalPriceItemPipe.transform(i),
      0
    );
  }
}

@NgModule({
  exports: [TotalPriceInvoicePipe],
  declarations: [TotalPriceInvoicePipe],
  providers: [TotalPriceInvoicePipe],
})
export class TotalPriceInvoicePipeModule {}
