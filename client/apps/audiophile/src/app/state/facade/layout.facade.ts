import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutActions } from '../actions';
import * as fromLayout from '../selectors/layout.selector';

@Injectable({ providedIn: 'root' })
export class LayoutFacade {
  shownNav$: Observable<boolean> = this._store.select(
    fromLayout.selectShownNav
  );
  shownCart$: Observable<boolean> = this._store.select(
    fromLayout.selectShownCart
  );

  constructor(private readonly _store: Store) {}

  closeNav(): void {
    this._store.dispatch(LayoutActions.closeNavOverlay());
  }

  toggleCartOverlay(): void {
    this._store.dispatch(LayoutActions.toggleCartOverlay());
  }

  toggleNavOverlay() {
    this._store.dispatch(LayoutActions.toggleNavOverlay());
  }
  closeAll() {
    this._store.dispatch(LayoutActions.closeAll());
  }
}
