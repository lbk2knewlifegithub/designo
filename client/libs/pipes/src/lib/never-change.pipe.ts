import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'neverChange',
})
export class NeverChangePipe implements PipeTransform {
  transform(value: any): string {
    return value;
  }
}

@NgModule({
  exports: [NeverChangePipe],
  declarations: [NeverChangePipe],
})
export class NeverChangePipeModule {}
