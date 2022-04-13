import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullnamePipe implements PipeTransform {
  transform(value: { firstname: string; lastname: string }): string {
    const { firstname, lastname } = value;
    return `${firstname} ${lastname}`;
  }
}

@NgModule({
  exports: [FullnamePipe],
  declarations: [FullnamePipe],
})
export class FullnamePipeModule {}
