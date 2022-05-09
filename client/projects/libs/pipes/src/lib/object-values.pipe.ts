import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues',
})
export class ObjectValuesPipe implements PipeTransform {
  transform(value: { [key: string]: unknown }): unknown[] {
    return Object.values(value);
  }
}

@NgModule({
  exports: [ObjectValuesPipe],
  declarations: [ObjectValuesPipe],
  providers: [ObjectValuesPipe],
})
export class ObjectValuesPipeModule {}
