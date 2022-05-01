import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardFacade } from './../facade';

@Component({
  selector: 'lbk-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./dashboard-page.component.html`,
})
export class DashboardPageComponent implements OnInit {
  loading$!: Observable<boolean | undefined>;
  error$!: Observable<string | undefined>;

  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.loading$ = this._dashboardFacade.loading$;
    this.error$ = this._dashboardFacade.error$;

    this._dashboardFacade.loadDashboard();
  }
}
