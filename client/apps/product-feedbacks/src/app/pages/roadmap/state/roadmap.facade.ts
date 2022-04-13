import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackStatus, FeedbackSummary } from '@lbk/models';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as RoadmapActions from './roadmap.actions';
import * as fromRoadmap from './roadmap.selectors';

/**
 * - Feedbacks Facade
 */
@Injectable({ providedIn: 'root' })
export class RoadmapFacade {
  /**
   * - Select Loading
   */
  loading$ = this._store.select(fromRoadmap.selectLoading);

  /**
   * - Select Error
   */
  error$ = this._store.select(fromRoadmap.selectError);

  /**
   * - Select Filter
   */
  filter$: Observable<FeedbackStatus> = this._store.select(
    fromRoadmap.selectFilter
  );

  summary$: Observable<FeedbackSummary> = combineLatest([
    this._feedbacksFacade.summaries$,
    this.filter$,
  ]).pipe(
    map(([statuses, filter]) => {
      return statuses.find((s) => s.status === filter) as FeedbackSummary;
    })
  );

  /**
   * - Constructor
   * @param _store
   * @param _feedbacksFacade
   * @param _route
   */
  constructor(
    private readonly _store: Store,
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _route: ActivatedRoute
  ) {}

  setFilter(filter: FeedbackStatus) {
    this._store.dispatch(RoadmapActions.setFilter({ filter }));
  }
}
