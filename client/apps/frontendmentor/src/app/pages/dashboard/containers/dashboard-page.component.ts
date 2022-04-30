import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./dashboard-page.component.html`,
})
export class DashboardPageComponent {}
