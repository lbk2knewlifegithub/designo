import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
})
export class ObjectKeysPipe implements PipeTransform {
  transform(value: { [key: string]: unknown }): string[] {
    return Object.keys(value);
  }
}

@NgModule({
  exports: [ObjectKeysPipe],
  declarations: [ObjectKeysPipe],
  providers: [ObjectKeysPipe],
})
export class ObjectKeysPipeModule {}
