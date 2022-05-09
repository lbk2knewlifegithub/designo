import { Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import {
  BillingDetails,
  Item,
  Payment,
  Product,
  ShippingInfo,
} from '../../shared';
import { CartActions } from '../actions';
import { fromCart } from '../selectors';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  /**
   * - All Items In Cart
   */
  items$: Observable<Item[]> = this._store.select(fromCart.selectItems);

  /**
   * - Number Of Items
   */
  numberOfItems$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  /**
   * - Empty
   */
  empty$: Observable<boolean> = this.numberOfItems$.pipe(
    map((numberOfItems) => numberOfItems === 0)
  );

  constructor(
    private readonly _store: Store,
    private readonly _dialogService: DialogService
  ) {}

  /**
   * - Add To Cart
   * @param toCart
   */
  addToCart(toCart: { quantity: number; product: Product }) {
    const {
      quantity,
      product: { name, price, id: productId, image },
    } = toCart;

    const item: Item = {
      quantity,
      name,
      price,
      productId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: image.mobile!,
    };

    this._store.dispatch(CartActions.addItem({ item }));
  }

  /**
   * - Checkout
   * @param checkoutDTO
   */
  checkout(
    billingDetails: BillingDetails,
    shippingInfo: ShippingInfo,
    payment: Payment
  ) {
    this.items$.pipe(take(1)).subscribe((items) => {
      if (items.length === 0) return;

      this._store.dispatch(
        CartActions.checkout({
          checkoutDTO: {
            billingDetails,
            shippingInfo,
            payment,
            items,
          },
        })
      );
    });
  }

  /**
   * - Load Cart
   */
  loadCart() {
    this._store.dispatch(CartActions.loadCart());
  }

  /**
   * - Clear All Items
   */
  clear() {
    this._dialogService
      .confirm({
        title: 'Are you sure?',
        body: "You won't be able to revert this!",
      })
      .afterClosed$.pipe(take(1))
      .subscribe((confirm: boolean) => {
        if (!confirm) return;
        this._store.dispatch(CartActions.clear());
      });
  }

  /**
   * - Add Quantity
   * @param productId
   */
  addQuantity(productId: number) {
    this._store.dispatch(CartActions.addQuantity({ productId }));
  }

  /**
   * - Minus Quantity
   * @param productId
   */
  minusQuantity(productId: number) {
    this._store.dispatch(CartActions.minusQuantity({ productId }));
  }
}
