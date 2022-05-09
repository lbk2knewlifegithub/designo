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
  selector: 'lbk-cart-item-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-6">
      <ng-container *ngFor="let item of items; trackBy: identifyItem">
        <lbk-cart-item
          (addQuantity)="addQuantity.emit(item.productId)"
          (minusQuantity)="minusQuantity.emit(item.productId)"
          [quantitySmall]="quantitySmall"
          [displayQuantity]="displayQuantity"
          [priceOptions]="priceOptions"
          [item]="item"
        ></lbk-cart-item>
      </ng-container>
    </div>
  `,
})
export class CartItemListComponent {
  @Input() displayQuantity!: boolean;
  @Input() quantitySmall!: boolean;
  @Input() items!: Item[];
  @Input() priceOptions!: PriceOptions;

  @Output() addQuantity = new EventEmitter<number>();
  @Output() minusQuantity = new EventEmitter<number>();

  identifyItem(index: number, item: Item) {
    return item.productId;
  }
}
