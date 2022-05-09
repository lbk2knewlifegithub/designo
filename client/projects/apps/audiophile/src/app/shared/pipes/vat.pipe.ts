import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { Item } from '../models';
import { TotalPipe } from './total.pipe';

@Pipe({
  name: 'vat',
})
export class VatPipe implements PipeTransform {
  constructor(private readonly totalPipe: TotalPipe) {}
  @memo()
  transform(items: Item[]): number {
    return this.totalPipe.transform(items) * 0.199;
  }
}

@NgModule({
  exports: [VatPipe],
  declarations: [VatPipe],
  providers: [VatPipe],
})
export class VATPipeModule {}
