import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { PriceOptions } from '@lbk/models';

@Component({
  selector: 'lbk-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p [class]="classList" class="md:text-lg">{{ value | currency: 'GBP' }}</p>
  `,
})
export class PriceComponent {
  @Input() value!: number;
  _options: PriceOptions = {
    color: 'text-fill-900',
    size: 'text-base',
    fontWeight: 'font-bold',
  };

  @Input() set options(options: PriceOptions) {
    Object.assign(this._options, options);
  }

  get classList(): string {
    return Object.values(this._options).join(' ');
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [PriceComponent],
  declarations: [PriceComponent],
})
export class PriceModule {}
