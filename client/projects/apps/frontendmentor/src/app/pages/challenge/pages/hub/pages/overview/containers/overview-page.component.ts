import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./overview-page.component.html`,
})
export class OverviewPageComponent {}
