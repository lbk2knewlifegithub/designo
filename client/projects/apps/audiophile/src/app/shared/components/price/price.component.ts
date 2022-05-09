import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from './price-options.model';

@Component({
  selector: 'lbk-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-between items-center">
      <h6
        *ngIf="options.title as title"
        class="uppercase font-medium text-gray-500"
      >
        {{ title }}
      </h6>

      <lbk-dollars
        [size]="options.size ?? 'md'"
        [color]="options.color ?? 'text-black'"
        [dollars]="value"
      ></lbk-dollars>
    </div>
  `,
})
export class PriceComponent {
  @Input() options: PriceOptions = {};
  @Input() value!: number;
}
