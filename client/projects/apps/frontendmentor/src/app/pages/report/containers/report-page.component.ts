import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-report-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./report-page.component.html`,
})
export class ReportPageComponent {}
