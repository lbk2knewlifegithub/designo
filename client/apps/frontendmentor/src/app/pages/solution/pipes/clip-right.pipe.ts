import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipRight',
})
export class ClipRightPipe implements PipeTransform {
  transform(num: number | null): string {
    if (!num) return 'rect(auto, auto, auto, 0px)';
    return `rect(auto, auto, auto, ${num}px)`;
  }
}
