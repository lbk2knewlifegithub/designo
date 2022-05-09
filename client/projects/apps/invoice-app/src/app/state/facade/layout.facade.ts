import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { LayoutActions } from '../actions';
import { fromLayout } from '../selectors';

@Injectable({ providedIn: 'root' })
export class LayoutFacade {
  darkTheme$: Observable<boolean> = this._store.select(
    fromLayout.selectDarkThem
  );

  constructor(private readonly _store: Store) {
    this.darkTheme$.subscribe(console.log);
  }

  /**
   * - Load Theme
   */
  loadTheme() {
    this._store.dispatch(LayoutActions.loadTheme());
  }

  /**
   * - Toggle Theme
   */
  toggleTheme() {
    this.darkTheme$.pipe(take(1)).subscribe((darkTheme) => {
      darkTheme ? this._toLightTheme() : this._toDarkTheme();
    });
  }

  /**
   * - To Dark Theme
   */
  private _toDarkTheme() {
    this._store.dispatch(LayoutActions.toDarkTheme());
  }

  /**
   * - To Light Theme
   */
  private _toLightTheme() {
    this._store.dispatch(LayoutActions.toLightTheme());
  }
}
