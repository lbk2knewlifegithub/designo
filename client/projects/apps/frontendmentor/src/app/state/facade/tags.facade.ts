import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { TagsActions } from '../actions';
import { fromTags } from '../selectors';
import { Tag } from './../../shared';

/**
 * - Tags Facade
 */
@Injectable({ providedIn: 'root' })
export class TagsFacade {
  readonly loading$: Observable<boolean> = this._store.select(
    fromTags.selectLoading
  );

  readonly loaded$: Observable<boolean> = this._store.select(
    fromTags.selectLoaded
  );

  /**
   * - Tags
   */
  tags$: Observable<Tag[]> = this._store.select(fromTags.selectAllTags);

  constructor(private readonly _store: Store) {}

  /**
   * - Load Tags
   */
  loadTags() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) => !loaded && this._store.dispatch(TagsActions.loadTags())
      );
  }
}
