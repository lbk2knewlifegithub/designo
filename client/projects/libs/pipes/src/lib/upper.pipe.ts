import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper',
})
export class UpperPipe implements PipeTransform {
  /**
   * - Upper whole string when string.len() <= n
   * - Only upper first character when string.len() > n or n is underfined
   * @param value
   * @param num
   * @returns
   */
  transform(value: string, ...args: any): string {
    const num = args[0];

    if (value.length <= num) {
      return value.toUpperCase();
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

@NgModule({
  exports: [UpperPipe],
  declarations: [UpperPipe],
})
export class UpperPipeModule {}
