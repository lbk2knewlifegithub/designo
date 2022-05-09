import { Inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable, of, tap, throwError } from 'rxjs';
import { Item, Order } from '../../shared';
import { CheckoutDTO } from './../../shared/dto/checkout.dto';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'audiophile-app-local-storage',
  { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class CartService {
  cartKey = 'cart';

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getCart(): Observable<Item[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.cartKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToCart(newItem: Item): Observable<Item[]> {
    return this.getCart().pipe(
      map((items) => {
        const founded = items.find((i) => i.productId === newItem.productId);

        if (!founded) return [...items, newItem];

        return items.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }),
      tap((items) => this.save(items))
    );
  }

  save(items: Item[]) {
    this.storage.setItem(this.cartKey, JSON.stringify(items));
  }

  removeAll(): Observable<boolean> {
    return of(this.storage.removeItem(this.cartKey)).pipe(map(() => true));
  }

  addQuantity(productId: number): Observable<Item[]> {
    return this.getCart().pipe(
      map((items) =>
        items.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        )
      ),
      tap((items) => this.save(items))
    );
  }

  minus(productId: number): Observable<Item[]> {
    return this.getCart().pipe(
      map((items) =>
        items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.max(i.quantity - 1, 0) }
            : i
        )
      ),
      map((items) => items.filter((i) => i.quantity > 0)),
      tap((items) => this.save(items))
    );
  }

  /**
   * - Checkout
   * @param checkoutDTO
   * @returns
   */
  checkout(checkoutDTO: CheckoutDTO): Observable<Order> {
    const { billingDetails, shippingInfo, payment, items } = checkoutDTO;
    return of({
      id: Math.random() * 1000,
      billingDetails,
      shippingInfo,
      payment,
      items,
    });
  }
}
