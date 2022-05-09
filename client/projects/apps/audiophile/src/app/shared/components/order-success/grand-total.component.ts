import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '../price';

@Component({
  selector: 'lbk-grand-total-order-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [ngClass]="ngClass"
      class="bg-black pt-4 pb-5 pl-6 md:h-full md:py-10 "
    >
      <p class="uppercase font-medium text-gray-400">Grand total</p>

      <lbk-price
        class="block mt-4"
        [value]="grandTotal"
        [options]="priceOptions"
      ></lbk-price>
    </div>
  `,
})
export class GrandTotalOrderSuccessComponent {
  @Input() grandTotal!: number;
  @Input() placeEnd!: boolean;

  priceOptions: PriceOptions = {
    color: 'text-white',
    size: 'lg',
  };

  get ngClass() {
    return {
      'md:flex md:flex-col md:justify-end': this.placeEnd,
    };
  }
}
