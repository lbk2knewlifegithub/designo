import { NgModule, Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'features',
})
export class FeaturesPipe implements PipeTransform {
  @memo()
  transform(name: string): string {
    return name
      .split('\n\n')
      .map((split) => this.wrapWith('p', split, 'mt-6 md:mt-8'))
      .join('');
  }

  wrapWith(tag: string, text: string, className: string): string {
    return `<${tag} class='${className}'>${text}</${tag}>`;
  }
}

@NgModule({
  exports: [FeaturesPipe],
  declarations: [FeaturesPipe],
  providers: [FeaturesPipe],
})
export class FeaturesPipeModule {}
