import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productName',
})
export class ProductNamePipe implements PipeTransform {
  transform(name: string, category: string): string {
    const index = name.toLowerCase().indexOf(category.toLowerCase());
    return name.slice(0, index) + '<br>' + category.toUpperCase();
  }
}

@NgModule({
  exports: [ProductNamePipe],
  declarations: [ProductNamePipe],
  providers: [ProductNamePipe],
})
export class ProductNamePipeModule {}
