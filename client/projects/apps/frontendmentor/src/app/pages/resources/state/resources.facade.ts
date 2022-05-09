import { Injectable } from '@angular/core';
import { ResourceGroup } from '@lbk/fm/shared';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ResourcesActions } from './actions';
import * as fromResources from './resources.selectors';

/**
 * - Resources Facade
 */
@Injectable({ providedIn: 'root' })
export class ResourcesFacade {
  /**
   * - Select Resources Group
   */
  resourcesGroups$: Observable<ResourceGroup[]> = this._store.select(
    fromResources.selectResourcesGroup
  );

  /**
   * - Resoucres Groups
   */
  // resourcesGroups$: Observable<ResourceGroup[]> = this.allResources$.pipe(
  //   switchMap((resources) =>
  //     of(resources).pipe(
  //       concatAll(),
  //       groupBy((r1) => r1.resourceGroup),
  //       mergeMap((g1) =>
  //         zip(
  //           of(g1.key),

  //           g1.pipe(
  //             groupBy((r2) => r2.resourceType),
  //             mergeMap((g2) => zip(of(g2.key), g2.pipe(toArray()))),
  //             toArray()
  //           )
  //         )
  //       ),
  //       map((ar1) => ({
  //         title: ar1[0],
  //         child: ar1[1].map((ar2) => ({ title: ar2[0], resources: ar2[1] })),
  //       })),
  //       toArray()
  //     )
  //   )
  // );

  /**
   * - Select Loaded
   */
  loaded$: Observable<boolean> = this._store.select(fromResources.selectLoaded);

  /**
   * - Select Loading
   */
  loading$: Observable<boolean> = this._store.select(
    fromResources.selectLoading
  );

  constructor(private readonly _store: Store) {}

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
