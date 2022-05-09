import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { Item } from '../models';
import { ShippingPipe, ShippingPipeModule } from './shipping.pipe';
import { TotalPipe, TotalPipeModule } from './total.pipe';

@Pipe({
  name: 'grandTotal',
})
export class GrandTotalPipe implements PipeTransform {
  constructor(
    private readonly totalPipe: TotalPipe,
    private readonly shippingPipe: ShippingPipe
  ) {}

  @memo()
  transform(items: Item[]): number {
    return this.totalPipe.transform(items) + this.shippingPipe.transform(items);
  }
}

@NgModule({
  imports: [TotalPipeModule, ShippingPipeModule],
  exports: [GrandTotalPipe],
  declarations: [GrandTotalPipe],
  providers: [GrandTotalPipe],
})
export class GrandTotalPipeModule {}
