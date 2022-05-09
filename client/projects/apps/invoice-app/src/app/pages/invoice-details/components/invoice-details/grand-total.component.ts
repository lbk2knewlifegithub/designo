import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '@lbk/models';

@Component({
  selector: 'lbk-grand-total',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-dark-900 p-6 text-inverted-900 flex items-center justify-between dark:bg-black"
    >
      <p class="text-sm ">
        <span class="md:hidden">Grand Total</span>
        <span class="hidden md:block">Amount Due</span>
      </p>

      <p class="font-bold text-xl md:text-2xl">
        {{ grandTotal | currency: 'GBP' }}
      </p>
    </div>
  `,
})
export class GrandTotalComponent {
  @Input() grandTotal!: number;

  priceOptions: PriceOptions = {
    size: 'text-xl',
  };
}
