import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Item } from '../../models';
import { PriceOptions } from '../price';

@Component({
  selector: 'lbk-cart-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between">
      <div class="flex gap-4 items-center">
        <!-- item image -->
        <img
          class="max-w-[64px] max-h-[64px] rounded-lg"
          [src]="item.image"
          [alt]="item.name"
        />
        <!-- end item image -->

        <div>
          <!-- item name -->
          <p class="font-bold">{{ item.name | shortName }}</p>
          <!-- end item name -->

          <!-- item price -->
          <lbk-price [value]="item.price" [options]="priceOptions"></lbk-price>
          <!-- end item price -->
        </div>
      </div>

      <div [class.self-start]="amountAlignTop">
        <!-- quantity -->
        <lbk-quantity
          (plus)="addQuantity.emit()"
          (minus)="minusQuantity.emit()"
          *ngIf="displayQuantity; else amount"
          [small]="quantitySmall"
          [quantity]="item.quantity"
        ></lbk-quantity>
        <!-- end quantity -->

        <!-- amount -->
        <ng-template #amount>
          <lbk-amount [amount]="item.quantity"></lbk-amount>
        </ng-template>
        <!-- end amount -->
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Item;
  @Input() displayQuantity!: boolean;
  @Input() quantitySmall!: boolean;
  @Input() amountAlignTop!: boolean;
  @Input() priceOptions!: PriceOptions;

  @Output() addQuantity = new EventEmitter<void>();
  @Output() minusQuantity = new EventEmitter<void>();
}
