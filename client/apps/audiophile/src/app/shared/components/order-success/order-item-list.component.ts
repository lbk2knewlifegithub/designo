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
  selector: 'lbk-order-item-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-muted-900 p-6">
      <!-- Order Items List -->
      <ul class="grid gap-4">
        <ng-container *ngFor="let item of items; trackBy: identifyItem">
          <li>
            <lbk-cart-item
              [item]="item"
              [priceOptions]="priceOptions"
              [amountAlignTop]="true"
              [displayQuantity]="false"
            ></lbk-cart-item>
          </li>
        </ng-container>
      </ul>
      <!-- end Order Items List -->

      <!-- Rest Items -->
      <div class="block pt-3 mt-4 border-t border-gray-300 md:mt-3">
        <button
          (click)="onRest.emit()"
          class="w-full text-xs font-bold text-center text-gray-400"
        >
          <p *ngIf="rest > 0; else viewLess">add {{ rest }} other item(s)</p>

          <ng-template #viewLess>
            <p>View less</p>
          </ng-template>
        </button>
      </div>
      <!-- end Rest Items -->
    </div>
  `,
})
export class OrderItemListComponent {
  private _items!: Item[];
  get items() {
    return this._items.slice(0, this.display);
  }

  @Input() set items(items: Item[]) {
    this._items = items;
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onRest = new EventEmitter<void>();

  @Input() display!: number;

  priceOptions: PriceOptions = {
    size: 'sm',
    color: 'text-gray-500',
  };

  identifyItem(index: number, item: Item) {
    return item.productId;
  }

  get rest(): number {
    return this._items.length - this.display;
  }
}
