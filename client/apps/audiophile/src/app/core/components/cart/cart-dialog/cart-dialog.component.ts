import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceOptions, Item } from '../../../../shared';
import { CartFacade } from '../../../../state/facade/cart.facade';

@Component({
  selector: 'lbk-cart-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./cart-dialog.component.html`,
})
export class CartDialogComponent implements OnInit {
  items$!: Observable<Item[]>;
  numberOfItems$!: Observable<number>;
  empty$!: Observable<boolean>;

  priceOptions: PriceOptions = {
    size: 'sm',
    color: 'text-gray-500',
  };

  constructor(private readonly _cartFacade: CartFacade) {}

  ngOnInit(): void {
    this.items$ = this._cartFacade.items$;
    this.numberOfItems$ = this._cartFacade.numberOfItems$;
    this.empty$ = this._cartFacade.empty$;
  }

  clear() {
    this._cartFacade.clear();
  }

  addQuantity(productId: number) {
    this._cartFacade.addQuantity(productId);
  }

  minusQuantity(productId: number) {
    this._cartFacade.minusQuantity(productId);
  }
}
