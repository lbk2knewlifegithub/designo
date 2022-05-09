import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Item, PriceOptions } from '../../../../shared';

@Component({
  selector: 'lbk-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid gap-8 py-8 px-6 bg-white rounded-lg md:p-8">
      <!-- Title -->
      <h5 class="uppercase text-lg font-bold">Summary</h5>
      <!-- end Title -->

      <lbk-cart-item-list
        [quantitySmall]="true"
        [displayQuantity]="false"
        [items]="items"
        [priceOptions]="priceOptions"
      ></lbk-cart-item-list>

      <div class="grid gap-2">
        <!-- Total -->
        <lbk-total [total]="items | total"></lbk-total>
        <!-- end Total -->

        <!-- Shipping -->
        <lbk-shipping [shipping]="items | shipping"></lbk-shipping>
        <!-- end Shipping -->

        <!-- VAT -->
        <lbk-vat [vat]="items | vat"></lbk-vat>
        <!-- end VAT -->
      </div>

      <!-- Grand Total -->
      <lbk-grand-total [grandTotal]="items | grandTotal"></lbk-grand-total>
      <!-- end Grand Total -->

      <!-- Countine And Pay -->
      <button
        (click)="checkout.emit()"
        [disabled]="disabled"
        class="btn btn-primary w-full"
      >
        Continue & Pay
      </button>
      <!-- end Countine And Pay -->
    </section>
  `,
})
export class SummaryComponent {
  @Input() items!: Item[];
  @Input() disabled!: boolean;

  @Output() checkout = new EventEmitter();

  priceOptions: PriceOptions = {
    size: 'sm',
    color: 'text-gray-500',
  };
}
