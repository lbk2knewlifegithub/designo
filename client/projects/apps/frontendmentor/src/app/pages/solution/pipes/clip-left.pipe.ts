import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipLeft',
})
export class ClipLeftPipe implements PipeTransform {
  transform(num: number | null): string {
    if (!num) return 'rect(auto, 0px, auto, auto)';
    return `rect(auto, ${num}px, auto, auto)`;
  }
}
