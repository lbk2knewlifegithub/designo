import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longNumber',
})
export class LongNumberPipe implements PipeTransform {
  static LONG_NUMBERS: { [key: string]: string } = {
    '1': 'one',
    '2': 'two',
    '3': 'tree',
    '4': 'four',
    '5': 'five',
  };

  transform(num: number): string {
    return LongNumberPipe.LONG_NUMBERS[num.toString()] ?? num.toString();
  }
}

@NgModule({
  exports: [LongNumberPipe],
  declarations: [LongNumberPipe],
})
export class LongNumberPipeModule {}
