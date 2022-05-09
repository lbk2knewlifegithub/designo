import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { Item } from '../models';
import { TotalPipe, TotalPipeModule } from './total.pipe';

@Pipe({
  name: 'shipping',
})
export class ShippingPipe implements PipeTransform {
  constructor(private readonly totalPipe: TotalPipe) {}

  @memo()
  transform(items: Item[]): number {
    return this.totalPipe.transform(items) * 0.0092;
  }
}

@NgModule({
  imports: [TotalPipeModule],
  exports: [ShippingPipe],
  declarations: [ShippingPipe],
  providers: [ShippingPipe],
})
export class ShippingPipeModule {}
