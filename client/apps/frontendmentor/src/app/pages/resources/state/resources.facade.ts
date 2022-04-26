import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  concatAll,
  groupBy,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  toArray,
  zip,
} from 'rxjs';
import { Resource } from './../../../shared';
import { ResourcesActions } from './actions';
import * as fromResources from './resources.selectors';

/**
 * - Resources Facade
 */
@Injectable({ providedIn: 'root' })
export class ResourcesFacade {
  /**
   * - Select All Resources
   */
  allResources$: Observable<Resource[]> = this._store.select(
    fromResources.selectResources
  );

  /**
   * - Resoucre Summaries
   */
  resourceSummaries$: Observable<any> = this.allResources$.pipe(
    // map((resources) => {
    //   return [];
    // })
    switchMap((resources) =>
      of(resources).pipe(
        concatAll(),
        groupBy((r) => r.resourceGroup),
        mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
        // map((array) => createSummaryFeedback(array[0], array[1])),
        toArray()
      )
    )
  );

  /**
   * - Select Loaded
   */
  loaded$: Observable<boolean> = this._store.select(fromResources.selectLoaded);

  constructor(private readonly _store: Store) {
    this.resourceSummaries$.subscribe(console.log);
  }

  /**
   * - Load All Resources
   */
  loadAllResources() {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (loaded) return;
      this._store.dispatch(ResourcesActions.loadAllResources());
    });
  }
}
