import { Injectable } from '@angular/core';
import { Feedback, FeedbackCategory, FeedbackStatus } from '@lbk/models';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { createRoadmap, Roadmap } from '../models/roadmap.model';
import * as HomeActions from './home.actions';
import { SortFeedback } from './home.reducer';
import * as fromHome from './home.selector';

/**
 * - Feedbacks Facade
 */
@Injectable({ providedIn: 'root' })
export class HomeFacade {
  /**
   * - Sort
   */
  sort = this._store.select(fromHome.selectSort);

  /**
   * - Category
   */
  category$ = this._store.select(fromHome.selectCategory);

  /**
   * - Select Feedback selected
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  feedback$: Observable<Feedback> =
    this._feedbacksFacade.selectedFeedback$.pipe(
      map((feedback) => feedback as unknown as Feedback)
    );

  /**
   * - Get all feedbacks status is suggestion
   */
  suggestionFeedbacks$: Observable<Feedback[]> =
    this._feedbacksFacade.allFeedbacks$.pipe(
      map((feedbacks) =>
        feedbacks.filter((f) => f.status === FeedbackStatus.SUGGESTION)
      )
    );

  /**
   * - Roadmap Summary
   */
  roadmapSummary$: Observable<Roadmap[]> =
    this._feedbacksFacade.summaries$.pipe(
      map((summaries) => summaries.map((s) => createRoadmap(s)))
    );

  /**
   * - Filter  feedback
   */
  feedbackFiltered$: Observable<Feedback[]> = combineLatest([
    this.suggestionFeedbacks$,
    this.sort,
    this.category$,
  ]).pipe(
    map(([feedbacks, filter, category]) => {
      let result: Feedback[] = [];

      switch (filter) {
        // Filter by Least Upvotes
        case SortFeedback.LEAST_UPVOTES: {
          result = [...feedbacks.sort((f1, f2) => f1.upvotes - f2.upvotes)];
          break;
        }

        // Filter by Most Upvotes
        case SortFeedback.MOST_UPVOTES: {
          result = [...feedbacks.sort((f1, f2) => f2.upvotes - f1.upvotes)];
          break;
        }

        // Filter by Least Upvotes
        case SortFeedback.LEAST_COMMENTS: {
          result = [
            ...feedbacks.sort(
              (f1, f2) => f1.commentsLength - f2.commentsLength
            ),
          ];
          break;
        }
        // Filter by Most Upvotes
        case SortFeedback.MOST_COMMENTS: {
          result = [
            ...feedbacks.sort(
              (f1, f2) => f2.commentsLength - f1.commentsLength
            ),
          ];
          break;
        }
      }

      // Filter by category
      if (category)
        return result.filter(
          (feedback) =>
            feedback.category.toLowerCase() === category.toLowerCase()
        );

      return result;
    })
  );

  /**
   * - Select Loading
   */
  loading$ = this._store.select(fromHome.selectLoading);

  /**
   * - Select Shown Side Bar
   */
  shownSidebar$ = this._store.select(fromHome.selectShownSideBar);

  /**
   * - Constructor
   * @param _store
   * @param _feedbacksFacade
   */
  constructor(
    private readonly _store: Store,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}

  /**
   * - Toggle Side Bar
   */
  toggleSideBar() {
    this.shownSidebar$.pipe(take(1)).subscribe((shownSideBar) => {
      // Trigger Close Side Bar
      if (shownSideBar) return this._store.dispatch(HomeActions.closeSideBar());

      // Trigger Show Side Bar
      this._store.dispatch(HomeActions.showSideBar());
    });
  }

  /**
   * - Close Sidebar
   */
  closeSidebar() {
    this.shownSidebar$.pipe(take(1)).subscribe((shownSideBar) => {
      if (!shownSideBar) return;

      // Trigger Close Side Bar
      this._store.dispatch(HomeActions.closeSideBar());
    });
  }

  /**
   * - Set Filter
   */
  setFilter(sort: SortFeedback) {
    this._store.dispatch(HomeActions.setSort({ sort }));
  }

  /**
   * - Set Category
   */
  setCategory(category: FeedbackCategory | undefined) {
    this.category$.pipe(take(1)).subscribe((old) => {
      if (old === category) return;
      this._store.dispatch(HomeActions.setCategory({ category }));
    });
  }
}
