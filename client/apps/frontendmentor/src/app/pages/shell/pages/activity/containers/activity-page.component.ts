import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-activity-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./activity-page.component.html`,
})
export class ActivityPageComponent {}
