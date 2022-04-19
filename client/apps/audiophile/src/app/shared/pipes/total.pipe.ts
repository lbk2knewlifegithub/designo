import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { Item } from '../models';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  @memo()
  transform(items: Item[]): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}

@NgModule({
  exports: [TotalPipe],
  declarations: [TotalPipe],
  providers: [TotalPipe],
})
export class TotalPipeModule {}
