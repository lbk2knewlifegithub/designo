import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { map, Observable, pluck, switchMap, tap } from 'rxjs';
import { LearnAboutChallengeComponent } from '../components';
import {
  AllTimeFacade,
  FamesFacade,
  MonthFacade,
  WeekFacade,
  YearFacade,
} from '../facades';
import { Fame } from '../models';

@Component({
  selector: 'lbk-wall-of-fame-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./wall-of-fame-page.component.html`,
})
export class WallOfFamePageComponent implements OnInit {
  FAMES_FACADE: { [key: string]: FamesFacade } = {
    week: this._weekFacade,
    month: this._monthFacade,
    year: this._yearFacade,
    'all-time': this._allTimeFacade,
  };

  fames$!: Observable<Fame[]>;
  loading$!: Observable<boolean | undefined>;
  error$!: Observable<string | undefined>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _route: ActivatedRoute,
    private readonly _weekFacade: WeekFacade,
    private readonly _monthFacade: MonthFacade,
    private readonly _yearFacade: YearFacade,
    private readonly _allTimeFacade: AllTimeFacade
  ) {}

  ngOnInit(): void {
    const famesFacade$ = this._route.queryParams.pipe(
      pluck('tab'),
      map((tab) => this.FAMES_FACADE[tab] ?? this.FAMES_FACADE['week']),
      tap((famesFacade) => famesFacade.loadFames())
    ) as Observable<FamesFacade>;

    this.fames$ = famesFacade$.pipe(
      switchMap((famesFacade) => famesFacade.fames$)
    );
    this.loading$ = famesFacade$.pipe(
      switchMap((famesFacade) => famesFacade.loading$)
    );
    this.error$ = famesFacade$.pipe(
      switchMap((famesFacade) => famesFacade.error$)
    );
  }

  /**
   * - Learn About Wall Of Fame
   */
  learnAboutWallOfFame() {
    this._dialogService.open(LearnAboutChallengeComponent);
  }
}
