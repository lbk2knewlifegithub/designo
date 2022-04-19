import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  @memo()
  transform(productName: string): string {
    const categoryNames = ['headphones', 'speaker', 'earphones', 'wireless'];
    let result = productName;

    // Remove category
    for (let i = 0; i < categoryNames.length; i++) {
      const categoryName = categoryNames[i];
      result = result.replace(new RegExp(categoryName, 'gi'), '');
    }

    // Replay Mark to MK
    result = result.replace(new RegExp('mark', 'gi'), 'MK');

    return result.trim();
  }
}

@NgModule({
  exports: [ShortNamePipe],
  declarations: [ShortNamePipe],
  providers: [ShortNamePipe],
})
export class ShortNamePipeModule {}
