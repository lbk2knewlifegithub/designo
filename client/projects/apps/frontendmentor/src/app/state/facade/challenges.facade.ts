import { ChallengeStatus } from './../../shared/models/challenge.model';
import { selectStartingChallenge } from './../selectors/challenges.selectors';
import { DialogService } from '@ngneat/dialog';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import {
  Challenge,
  ChallengeQuery,
  ChallengeSort,
  CHALLENGES_SERVICE,
  DIFFICULTIES,
} from '../../shared';
import { ChallengesActions } from '../actions';
import * as fromChallanges from '../selectors/challenges.selectors';
import { ChallengesService } from '../services';

/**
 * - Challenges Facade
 */
@Injectable({ providedIn: 'root' })
export class ChallengesFacade {
  private readonly _queries = new BehaviorSubject<ChallengeQuery | undefined>(
    undefined
  );
  set queries(queries: ChallengeQuery | undefined) {
    this._queries.next(queries);
  }
  private readonly queries$: Observable<ChallengeQuery | undefined> =
    this._queries.asObservable();

  readonly loading$: Observable<boolean> = this._store.select(
    fromChallanges.selectLoading
  );

  readonly startingChallenge$: Observable<boolean> = this._store.select(
    fromChallanges.selectStartingChallenge
  );

  /**
   * - Challenges
   */
  challenges$: Observable<Challenge[]> = this._store.select(
    fromChallanges.selectAllChallenges
  );

  /**
   * - Latest Challenges
   */
  latestChallenges$: Observable<Challenge[]> = this.challenges$.pipe(
    map((challenges) => challenges.slice(0, 6))
  );

  /**
   * - Process Challenges
   */
  processedChallenges$: Observable<Challenge[]> = combineLatest([
    this.queries$,
    this.challenges$,
  ]).pipe(
    map(([queries, challenges]) => {
      if (!queries) return challenges;
      let result = [...challenges];

      const types =
        queries.type && queries.type.length > 0 ? queries.type : undefined;

      const difficulties =
        queries.difficulty && queries.difficulty.length > 0
          ? queries.difficulty
          : undefined;

      const languages =
        queries.language && queries.language.length > 0
          ? queries.language
          : undefined;

      const sort = queries.sort;

      // Filter By Types
      if (types) {
        result = result.filter((c) => types.includes(c.type));
      }

      // Filter By Difficulties
      if (difficulties) {
        result = result.filter((c) => difficulties.includes(c.difficulty));
      }

      // Filter By Languages
      if (languages) {
        result = result.filter((c) =>
          c.languages.some((l1) => languages.includes(l1))
        );
      }

      // Sort By Difficulty Ascendent
      if (sort && sort === ChallengeSort.DIFFICULTY_ASC) {
        result = result.sort(
          (c1, c2) => DIFFICULTIES[c1.difficulty] - DIFFICULTIES[c2.difficulty]
        );
      }

      // Sort By Difficulty Descendent
      if (sort && sort === ChallengeSort.DIFFICULTY_DESC) {
        result = result.sort(
          (c1, c2) => DIFFICULTIES[c2.difficulty] - DIFFICULTIES[c1.difficulty]
        );
      }

      return result;
    })
  );

  /**
   * - Loaded
   */
  loaded$: Observable<boolean> = this._store.select(
    fromChallanges.selectLoaded
  );

  /**
   * - Selected Challenge
   */
  selectedChallenge$: Observable<Challenge | null | undefined | ''> =
    this._store.select(fromChallanges.selectSelectedChallange);

  constructor(
    private readonly _store: Store,
    @Inject(CHALLENGES_SERVICE)
    private readonly _challengesService: ChallengesService,
    private readonly _ds: DialogService
  ) {}

  /**
   * - Load Challenges
   */
  loadChallenges() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(ChallengesActions.loadChallenges())
      );
  }

  /**
   * - Has Challenge In Store
   * @param challenge_id
   */
  hasChallengeInStore(id: string, started?: boolean): Observable<boolean> {
    return this._store.select(fromChallanges.selectChallangeEntities).pipe(
      take(1),
      map((entities) => entities[id]),
      map((challenge) => {
        if (!challenge) return false;

        if (!started) {
          this.selectChallenge(id);
          return true;
        }

        if (!!challenge.status) {
          this.selectChallenge(id);
          return true;
        }

        return false;
      })
    );
  }

  /**
   * - Has Challenge In Api
   * @param challenge_id
   */
  hasChallengeInAPI(id: string, started?: boolean): Observable<boolean> {
    return this._challengesService.retrieveChallenge(id).pipe(
      take(1),
      map((challenge) => {
        if (!challenge) return false;

        if (!started) {
          this._store.dispatch(ChallengesActions.loadChallenge({ challenge }));
          this.selectChallenge(challenge.id);

          return true;
        }

        if (!!challenge.status) {
          this._store.dispatch(ChallengesActions.loadChallenge({ challenge }));
          this.selectChallenge(challenge.id);
          return true;
        }

        return false;
      }),
      catchError(() => of(false))
    );
  }

  /**
   * - Select Challenge
   */
  selectChallenge(id: string | null) {
    this._store.dispatch(ChallengesActions.selectChallenge({ id }));
  }

  /**
   *  - Start Challenge
   * @param id
   */
  startChallenge() {
    this.selectedChallenge$.pipe(take(1)).subscribe((challenge) => {
      if (!challenge) {
        this._ds.error("You haven't selected a challenge");
        return;
      }
      this._store.dispatch(
        ChallengesActions.startChallenge({ id: challenge.id })
      );
    });
  }
}
