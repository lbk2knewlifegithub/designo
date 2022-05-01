import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class LengthPipe implements PipeTransform {
  transform(arrays: Array<unknown> | null): number {
    return arrays ? arrays.length : 0;
  }
}

@NgModule({
  exports: [LengthPipe],
  declarations: [LengthPipe],
  providers: [LengthPipe],
})
export class LengthPipeModule {}
