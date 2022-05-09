import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardFacade } from './../facade/dashboard.facade';

@Component({
  selector: 'lbk-shell-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header [title]="(title$ | async)!"></lbk-sub-header>
    <router-outlet></router-outlet>
  `,
})
export class ShellDashboardPageComponent implements OnInit {
  title$!: Observable<string>;

  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit() {
    this._dashboardFacade.loadDashboard();
    this.title$ = this._dashboardFacade.title$;
  }
}
