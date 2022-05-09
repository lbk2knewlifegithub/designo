import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item, PriceOptions } from '../../../../../shared';

@Component({
  selector: 'lbk-invoice-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <!-- name -->
        <p class="font-bold">{{ item.name }}</p>
        <!-- end name -->

        <div
          class="text-muted-900 font-bold flex gap-1 items-center dark:text-muted-700"
        >
          <!-- quantity -->
          <span>{{ item.quantity }}</span>
          <!-- end quantity -->

          <span>x</span>

          <!-- price -->
          <lbk-price [options]="priceOptions" [value]="item.price"></lbk-price>
          <!-- end price -->
        </div>
      </div>

      <!-- total -->
      <lbk-price [value]="item | totalPriceItem"></lbk-price>
      <!-- end total -->
    </div>
  `,
})
export class InvoiceItemComponent {
  @Input() item!: Item;

  priceOptions: PriceOptions = {
    color: 'muted',
  };
}
