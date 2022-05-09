import { Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { OrderSuccessComponent } from '../../shared/components/order-success';
import { CartActions, CartAPIActions } from '../actions';
import { CartService } from '../services/cart.service';

@Injectable({ providedIn: 'root' })
export class CartEffects {
  /**
   * - Load Cart
   */
  loadCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.loadCart),
      exhaustMap(() =>
        this._cartService.getCart().pipe(
          /**
           * - Load Cart Success
           */
          map((items) => CartAPIActions.loadCartSuccess({ items })),

          /**
           * - Load Cart Failure
           */
          catchError((error) => of(CartAPIActions.loadCartFailure({ error })))
        )
      )
    )
  );

  /**
   * - Add To Cart
   */
  addToCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.addItem),
      exhaustMap(({ item }) =>
        this._cartService.addToCart(item).pipe(
          map(() => CartAPIActions.addItemSuccess({ item })),
          catchError((error) => of(CartAPIActions.addItemFailure({ error })))
        )
      )
    )
  );

  /**
   * - Clear All Items
   */
  clear$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.clear, CartAPIActions.checkoutSuccess),
      exhaustMap(() =>
        this._cartService.removeAll().pipe(
          map(() => CartAPIActions.clearSuccess()),
          catchError((error) => of(CartAPIActions.clearFailure({ error })))
        )
      )
    )
  );

  /**
   * - Add Quantity
   */
  addQuantity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.addQuantity),
      exhaustMap(({ productId }) =>
        this._cartService.addQuantity(productId).pipe(
          /**
           * - Add Quantity Success
           */
          map(() => CartAPIActions.addQuantitySuccess({ productId })),

          /**
           * - Add Quantity Failure
           */
          catchError((error) =>
            of(CartAPIActions.addQuantityFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Minus Quantity
   */
  minusQuantity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.minusQuantity),
      exhaustMap(({ productId }) =>
        this._cartService.minus(productId).pipe(
          /**
           * - Minus Quantity Success
           */
          map(() => CartAPIActions.minusQuantitySuccess({ productId })),

          /**
           * - Minus Quantity Failure
           */
          catchError((error) =>
            of(CartAPIActions.minusQuantityFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Checkout
   */
  checkout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CartActions.checkout),
      exhaustMap(({ checkoutDTO }) =>
        this._cartService.checkout(checkoutDTO).pipe(
          map((order) => CartAPIActions.checkoutSuccess({ order })),

          /**
           * - Checkout Success
           */
          tap(({ order: { items } }) => {
            this._dialogService.open(OrderSuccessComponent, {
              enableClose: false,
              closeButton: false,
              data: items,
            });
          }),
          catchError((error) => of(CartAPIActions.checkoutFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _cartService: CartService,
    private readonly _dialogService: DialogService
  ) {}
}
