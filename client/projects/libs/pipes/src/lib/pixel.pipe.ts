import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pixel',
})
export class PixelPipe implements PipeTransform {
  transform(num: number | null, offset = 0): string {
    if (!num) return '0px';
    return `${num - offset}px`;
  }
}

@NgModule({
  exports: [PixelPipe],
  declarations: [PixelPipe],
  providers: [PixelPipe],
})
export class PixelPipeModule {}
