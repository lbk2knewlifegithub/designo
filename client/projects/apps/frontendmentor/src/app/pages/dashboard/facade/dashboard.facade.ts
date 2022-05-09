import { Injectable } from '@angular/core';
import { Challenge, SolutionMinimal, Tags, UserMinimal } from '@lbk/fm/shared';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { DashboardActions } from '../actions';
import { Credits } from '../models';
import * as fromDashboard from '../selectors/dashboard.selectors';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  /**
   * - Select Challenge
   */
  private readonly _challenges$: Observable<Challenge[]> = this._store.select(
    fromDashboard.selectChallenges
  );

  /**
   * - In Progress Challenges
   */
  inProgressChallenges$: Observable<Challenge[]> = this._challenges$.pipe(
    map((challenges) =>
      challenges.filter((challenge) => challenge.status === 'in-progress')
    )
  );

  /**
   * - Completed Challenges
   */
  completedChallenges$: Observable<Challenge[]> = this._challenges$.pipe(
    map((challenges) =>
      challenges.filter((challenge) => challenge.status === 'completed')
    )
  );

  /**
   * - Select Credits
   */
  credits$: Observable<Credits> = this._store.select(
    fromDashboard.selectCredits
  );

  /**
   * - Select Bookmarks
   */
  bookmarks$: Observable<SolutionMinimal[]> = this._store.select(
    fromDashboard.selectBookmarks
  );

  /**
   * - Select Followers
   */
  followers$: Observable<UserMinimal[]> = this._store.select(
    fromDashboard.selectFollowers
  );

  /**
   * - Select Following
   */
  following$: Observable<UserMinimal[]> = this._store.select(
    fromDashboard.selectFollowing
  );

  /**
   * - Select Loading
   */
  loading$: Observable<boolean | undefined> = this._store.select(
    fromDashboard.selectLoading
  );

  /**
   * - Select Loaded
   */
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromDashboard.selectLoaded
  );

  /**
   * - Select Error
   */
  error$: Observable<string | undefined> = this._store.select(
    fromDashboard.selectError
  );

  /**
   * - Select Tags
   */
  tags$: Observable<Tags[]> = this._store.select(fromDashboard.selectTags);

  /**
   * - Title
   */
  title$: Observable<string> = this._store.select(fromDashboard.selectTitle);

  constructor(
    private readonly _store: Store,
    private readonly _actions$: Actions
  ) {}

  /**
   * - Load Dashboard
   */
  loadDashboard() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(DashboardActions.loadDashboard())
      );
  }
}
