import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-activity-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./activity-preview.component.html`,
  styleUrls: ['./activity-preview.component.scss'],
})
export class ActivityPreviewComponent {}
