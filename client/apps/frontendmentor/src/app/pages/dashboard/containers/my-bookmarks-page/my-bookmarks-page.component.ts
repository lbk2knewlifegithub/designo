import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionMinimal } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../../facade';

@Component({
  selector: 'lbk-my-bookmarks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-bookmarks-page.component.html',
  styleUrls: ['./my-bookmarks-page.component.scss'],
})
export class MyBookmarksPageComponent implements OnInit {
  bookmarks$!: Observable<SolutionMinimal[]>;
  loading$!: Observable<boolean | undefined>;

  constructor(
    private readonly _dashboardFacade: DashboardFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._dashboardFacade.loadDashboard();

    this.loading$ = this._dashboardFacade.loading$;
    this.bookmarks$ = this._dashboardFacade.bookmarks$;
  }
}
