import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'whiteSpace',
})
export class WhiteSpacePipe implements PipeTransform {
  @memo()
  transform(value: string): string {
    return value.replace(/([A-Z]+)/g, ' $1');
  }
}

@NgModule({
  exports: [WhiteSpacePipe],
  declarations: [WhiteSpacePipe],
  providers: [WhiteSpacePipe],
})
export class WhiteSpacePipeModule {}
