import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().split(' ').join('-');
  }
}

@NgModule({
  exports: [SlugPipe],
  declarations: [SlugPipe],
})
export class SlugPipeModule {}
